import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authLimiter } from "./middleware/rateLimiter.js";
import authRoutes from "./routes/authRoutes.js";
import logger from "./utils/logger.js";
import bookRouter from "./routes/booksRoutes.js";
import { authenticateToken } from "./middleware/auth.js";
import favoriteRouter from "./routes/favoritesRoutes.js";
import setupSwagger from "./swagger.js";
import bookShelvesRouter from "./routes/bookShelves.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

setupSwagger(app);

// Rate Limiting for auth routes
app.use("/api/auth", authLimiter);

// Routes
app.use("/api/user", authRoutes);
app.use("/api/books", bookRouter);
app.use("/api/favorites", authenticateToken, favoriteRouter);
app.use("/api/shelves", authenticateToken, bookShelvesRouter);

// Auth Testing
app.get("/api/test", authenticateToken, (_, res) => {
  res.json({ message: "You are authenticated" });
});

app.get("/healthz", (_, res) => {
  res.json({ message: "Welcome to the Book Scraper API" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
