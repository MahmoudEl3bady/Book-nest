import express from "express";
import {
  getBookReviews,
  deleteReview,
  createReview,
  updateReview,
} from "../controllers/reviews";

const router = express.Router();

/**
 *  GET /reviews
 *  GET /reviews/:id
 *  POST /reviews
 *  PUT /reviews/:id
 *  DELETE /reviews/:id
 */

router.get("/books/:bookId/reviews", getBookReviews);
router.post("/books/:bookId/reviews", createReview);
router.put("/reviews/:reviewId", updateReview);
router.delete("/reviews/:reviewId", deleteReview);

export default router;
