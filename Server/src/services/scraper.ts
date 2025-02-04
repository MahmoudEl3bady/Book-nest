import puppeteer, { Browser, Page } from "puppeteer";
import logger from "../utils/logger.js";
import prisma from "../config/prismaClient.js";
import { Response } from "express";

interface Book {
  title: string;
  rating: string;
  book_URL: string;
  description: string;
  image_url: string;
}

export async function scrapeBooks(_, res: Response): Promise<void> {
  const browser: Browser = await puppeteer.launch({ headless: true });
  const page: Page = await browser.newPage();

  try {
    let currentPage = 1;
    let hasNextPage = true;
    const allBooks: Book[] = [];
    const dbBooks = await prisma.book.findMany({
      select: { book_URL: true },
    });
    const dbBooksUrlSet = new Set<string>(dbBooks.map((book) => book.book_URL));

    while (hasNextPage) {
      const pageUrl = `https://books.toscrape.com/catalogue/page-${currentPage}.html`;
      await page.goto(pageUrl);

      // Get all book links from the current page
      const bookLinks = await page.$$eval(".product_pod h3 a", (links) =>
        links.map((link) => link.href)
      );

      // Process each book
      for (const bookUrl of bookLinks) {
        if (dbBooksUrlSet.has(bookUrl)) {
          continue; // Skip if book already exists in the database
        }
        await page.goto(bookUrl);

        const bookData: Book = await page.evaluate(() => {
          const title = document.querySelector(
            ".product_main h1"
          ) as HTMLElement | null;
          const titleText = title?.innerText || "";
          const rating =
            document.querySelector(".star-rating")?.classList[1] || "";
          const description = document.querySelector(
            "#product_description + p"
          ) as HTMLElement;

          const descriptionText = description?.innerText || "";

          const imageURL = document.querySelector(
            ".item.active img"
          ) as HTMLImageElement | null;
          const imageSrc = imageURL?.src || "";

          return {
            title: titleText,
            rating: String(
              ["One", "Two", "Three", "Four", "Five"].indexOf(rating) + 1
            ),
            book_URL: window.location.href,
            description: descriptionText,
            image_url: imageSrc,
          };
        });

        allBooks.push(bookData);

        // Rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const nextButton = await page.$(".pager .next a");
      if (!nextButton) {
        hasNextPage = false;
      } else {
        currentPage++;
      }
    }

    await prisma.book.createMany({
      data: allBooks,
    });

    logger.info(`Successfully scraped ${allBooks.length} books`);
    res
      .status(201)
      .json({ message: "Books scraped successfully", books: allBooks });
  } catch (error) {
    logger.error("Error during scraping:", error);
    res.status(500).json({ message: "Error during scraping", error });
  } finally {
    await browser.close();
  }
}
