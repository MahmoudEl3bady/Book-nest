import express from "express";
import { getBooks, getBookById, searchBooks } from "../controllers/books.js";

const router = express.Router();

router.get("/", getBooks);

router.get("/search", searchBooks);

router.get("/:id", getBookById);

export default router;
