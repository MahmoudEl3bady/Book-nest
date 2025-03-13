import express from "express";
import {
  getBookReviews,
  deleteReview,
  createReview,
  updateReview,
} from "../controllers/reviewsController";
import { authenticateToken } from "@/middleware/auth";

const router = express.Router();

/**
 * @openapi
 * /api/books/{bookId}/reviews:
 *   get:
 *     summary: Get reviews for a specific book
 *     description: Retrieve a list of reviews for the book identified by its bookId.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book.
 *     responses:
 *       200:
 *         description: A list of reviews for the specified book.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Book not found or no reviews available.
 */
router.get("/books/:bookId/reviews", getBookReviews);

/**
 * @openapi
 * /api/books/{bookId}/reviews:
 *   post:
 *     summary: Create a review for a book
 *     description: Add a new review to the book specified by bookId.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book.
 *     requestBody:
 *       required: true
 *       description: Review data for the new review.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Great book! Highly recommended."
 *     responses:
 *       201:
 *         description: Review created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Book not found.
 */
router.post("/books/:bookId/reviews", authenticateToken, createReview);

/**
 * @openapi
 * /api/reviews/{reviewId}:
 *   put:
 *     summary: Update an existing review
 *     description: Update the review identified by reviewId.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the review.
 *     requestBody:
 *       required: true
 *       description: Updated review data.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Updated review comment."
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Review not found.
 */
router.put("/reviews/:reviewId", authenticateToken, updateReview);

/**
 * @openapi
 * /api/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     description: Remove the review identified by reviewId.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the review.
 *     responses:
 *       200:
 *         description: Review deleted successfully.
 *       404:
 *         description: Review not found.
 */
router.delete("/reviews/:reviewId", authenticateToken, deleteReview);

export default router;
