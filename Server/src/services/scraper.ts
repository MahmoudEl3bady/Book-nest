import puppeteer, { Browser, Page } from "puppeteer";
import logger from "../utils/logger.js";
import prisma from "../config/prismaClient.js";

export async function scrapeBooks(req, res) {
  const browser: Browser = await puppeteer.launch({ headless: "new" });
  const page: Page = await browser.newPage();

  try {
    let currentPage = 1;
    let hasNextPage = true;
    const allBooks = [];

    while (hasNextPage) {
      const pageUrl = `https://books.toscrape.com/catalogue/page-${currentPage}.html`;
      await page.goto(pageUrl);

      // Get all book links from the current page
      const bookLinks = await page.$$eval(".product_pod h3 a", (links) =>
        links.map((link) => link.href)
      );

      // Process each book
      for (const bookUrl of bookLinks) {
        await page.goto(bookUrl);

        const bookData = await page.evaluate(() => {
          const title = document.querySelector(".product_main h1").innerText;
          const price = parseFloat(
            document.querySelector(".price_color").innerText.replace("£", "")
          );
          const rating = document.querySelector(".star-rating")?.classList[1];
          const description = document.querySelector(
            "#product_description + p"
          )?.innerText;

          return {
            title,
            author: "", // Default value since author is not scraped
            price,
            rating: String(
              ["One", "Two", "Three", "Four", "Five"].indexOf(rating) + 1
            ), // Convert to string
            book_URL: window.location.href, // Rename product_url to book_URL
            description,
            image_url: document.querySelector(".item.active img")?.src,
          };
        });

        allBooks.push(bookData);

        // Rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Check if there is a next page
      const nextButton = await page.$(".pager .next a");
      if (!nextButton) {
        hasNextPage = false; // No more pages
      } else {
        currentPage++; // Move to the next page
      }
    }

    // Save all books to the database
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
