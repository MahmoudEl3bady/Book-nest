import express from "express";
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoritesController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @openapi
 * /api/favorites:
 *   get:
 *     summary: Get user favorites
 *     description: Retrieve the list of favorite books for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of favorite books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favorites:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized (missing or invalid token).
 *       500:
 *         description: Internal server error.
 */
router.get("/", authenticateToken, getUserFavorites);

/**
 * @openapi
 * /api/favorites/new:
 *   post:
 *     summary: Add a book to user favorites
 *     description: Add a specific book to the authenticated user's list of favorites.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: The ID of the book to add.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       201:
 *         description: Book added to favorites successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.post("/new", authenticateToken, addFavorite);

/**
 * @openapi
 * /api/favorites/remove:
 *   delete:
 *     summary: Remove a book from user favorites
 *     description: Remove a specific book from the authenticated user's favorites list.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: The ID of the book to remove.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Book removed from favorites successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.delete("/remove", authenticateToken, removeFavorite);

export default router;
