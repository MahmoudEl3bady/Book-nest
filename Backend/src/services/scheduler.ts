// import cron from "node-cron";
// import { Book, scrapeBooks } from "./booksScraper";
// import prisma from "../config/prismaClient";
// import logger from "../utils/logger";
// import { populateDatabase } from "./googleBooks";

// // Run every day at midnight: "0 0 * * *"
// export const scheduledScrape = cron.schedule("0 0 * * *", async () => {
//   try {
//     const newBooks: Book[] = await scrapeBooks();

//     if (newBooks.length > 0) {
//       await prisma.book.createMany({ data: newBooks });
//       logger.info(`Added ${newBooks.length} new books`);
//     } else {
//       logger.info("No new books found");
//     }
//   } catch (error) {
//     logger.error("Scheduled scrape failed:", error);
//   }
// });

// cron.schedule("0 0 * * *", async () => {
//   try {
//     const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
//     if (!apiKey) {
//       logger.error("Google Books API key is not set");
//       return;
//     }

//     const popularBooks = await populateDatabase(apiKey);
//     logger.info(`Populated ${popularBooks.length} popular books`);
//   } catch (error) {
//     logger.error("Scheduled popular books population failed:", error);
//   }
// });
