import { body, param } from "express-validator";

export const bookshelfValidators = {
  createShelf: [
    body("name")
      .exists()
      .withMessage("Bookshelf name is required")
      .isString()
      .withMessage("Bookshelf name must be a string")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Bookshelf name must be between 1 and 100 characters"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .trim(),
    body("isPublic")
      .optional()
      .isBoolean()
      .withMessage("isPublic must be a boolean value"),
  ],

  addBook: [
    param("bookshelfId").isInt().withMessage("Bookshelf ID must be an integer"),
    body("bookId").exists().withMessage("Book ID is required"),
  ],
};
