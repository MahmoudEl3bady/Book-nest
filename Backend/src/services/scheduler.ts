import cron from "node-cron";
import { Book, scrapeBooks } from "./booksScraper";
import prisma from "../config/prismaClient";
import logger from "../utils/logger";

// Run every day at midnight: "0 0 * * *"
cron.schedule("0 0 * * *", async () => {
  try {
    const newBooks: Book[] = await scrapeBooks();

    if (newBooks.length > 0) {
      await prisma.book.createMany({ data: newBooks });
      logger.info(`Added ${newBooks.length} new books`);
    } else {
      logger.info("No new books found");
    }
  } catch (error) {
    logger.error("Scheduled scrape failed:", error);
  }
});
