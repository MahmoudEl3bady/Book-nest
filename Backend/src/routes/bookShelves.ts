import express, { Router } from "express";
import {
  addBookToShelf,
  addNewShelf,
  deleteShelf,
  getUserShelves,
  removeBookFromShelf,
} from "../controllers/bookShelvesController.js";
import { validate } from "../middleware/validate.js";
import { bookshelfValidators } from "../validators/bookshelf.js";

const router: Router = express.Router();

router.post("/", bookshelfValidators?.createShelf || [], validate, addNewShelf);

router.get("/", getUserShelves);

router.get("/user/:userId", getUserShelves);

// Add a book to a shelf
router.post(
  "/:bookshelfId/books",
  bookshelfValidators?.addBook || [],
  validate,
  addBookToShelf
);

// Remove a book from a shelf
router.delete("/:bookshelfId/books/:bookId", removeBookFromShelf);

// Delete a shelf
router.delete("/:bookshelfId", deleteShelf);

export default router;
