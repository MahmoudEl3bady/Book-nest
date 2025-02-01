import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiLimiter } from "./middleware/rateLimiter.js";
import authRoutes from "./routes/auth.js";
import logger from "./utils/logger.js";
import { scrapeBooks } from "./services/scraper.js";
import bookRouter from "./routes/books.js";
import { authenticateToken } from "./middleware/auth.js";
import favoriteRouter from "./routes/favorites.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRouter);
app.use("/api/favorites", authenticateToken, favoriteRouter);
app.get("/api/scrape-books", authenticateToken, scrapeBooks);

// Auth Testing
app.get("/api/test", authenticateToken, (req, res) => {
  res.json({ message: "You are authenticated" });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/healthz", (req, res) => {
  res.json({ message: "Welcome to the Book Scraper API" });
});
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
