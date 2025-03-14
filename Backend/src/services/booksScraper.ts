import puppeteer, { Browser, Page } from "puppeteer";
import logger from "../utils/logger.js";
import prisma from "../config/prismaClient.js";

export interface Book {
  title: string;
  rating: string;
  book_URL: string;
  description: string;
  image_url: string;
}

const SCRAPE_DELAY = 1000; // 1 second delay between requests
const BASE_URL = "https://books.toscrape.com/catalogue";

async function extractBookData(page: Page): Promise<Book> {
  return await page.evaluate(() => {
    const title =
      document.querySelector(".product_main h1")?.textContent?.trim() || "";
    const rating = document.querySelector(".star-rating")?.classList[1] || "";
    const description =
      document.querySelector("#product_description + p")?.textContent?.trim() ||
      "";
    const imageURL =
      (document.querySelector(".item.active img") as HTMLImageElement)?.src ||
      "";

    const ratingMap: { [key: string]: string } = {
      One: "1",
      Two: "2",
      Three: "3",
      Four: "4",
      Five: "5",
    };

    return {
      title,
      rating: ratingMap[rating] || "0",
      book_URL: window.location.href,
      description,
      image_url: imageURL,
    };
  });
}

/**
 * Scrapes books from books.toscrape.com and saves them to the database.
 * @returns The scraped books.
 */

export async function scrapeBooks(): Promise<Book[]> {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page: Page = await browser.newPage();
  const allBooks: Book[] = [];

  try {
    // Set a reasonable timeout
    await page.setDefaultNavigationTimeout(30000);

    // Get existing books from DB to avoid duplicates
    const dbBooks = await prisma.book.findMany({
      select: { book_URL: true },
    });
    const dbBooksUrlSet = new Set(dbBooks.map((book) => book.book_URL));

    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      logger.info(`Scraping page ${currentPage}`);
      const pageUrl = `${BASE_URL}/page-${currentPage}.html`;

      await page.goto(pageUrl, { waitUntil: "networkidle0" });

      const bookLinks = await page.$$eval(".product_pod h3 a", (links) =>
        links.map((link) => link.href)
      );

      // Process books in batches to improve performance
      const batchSize = 5;
      for (let i = 0; i < bookLinks.length; i += batchSize) {
        const batch = bookLinks.slice(i, i + batchSize);
        const batchPromises = batch.map(async (bookUrl) => {
          if (dbBooksUrlSet.has(bookUrl)) {
            return null;
          }

          try {
            await page.goto(bookUrl, { waitUntil: "networkidle0" });
            const bookData = await extractBookData(page);
            return bookData;
          } catch (error) {
            logger.error(`Error scraping book ${bookUrl}:`, error);
            return null;
          }
        });

        const batchResults = await Promise.all(batchPromises);
        allBooks.push(
          ...batchResults.filter((book): book is Book => book !== null)
        );

        await new Promise((resolve) => setTimeout(resolve, SCRAPE_DELAY));
      }

      const nextButton = await page.$(".pager .next a");
      hasNextPage = !!nextButton;
      currentPage++;
    }

    // Save books in batches
    if (allBooks.length > 0) {
      await prisma.book.createMany({
        data: allBooks,
        skipDuplicates: true as never,
      });
    }

    logger.info(`Successfully scraped ${allBooks.length} new books`);
    return allBooks;
  } catch (error) {
    logger.error("Error during scraping process:", error);
    throw error;
  } finally {
    await browser.close();
  }
}
