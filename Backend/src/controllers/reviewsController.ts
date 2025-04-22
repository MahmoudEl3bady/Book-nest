// controllers/reviews.ts
import { Request, Response } from "express";
import prisma from "../config/prismaClient.js";

export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bookId } = req.params;
  const { comment, rating } = req.body;
  const userId = req.user!.id;

  try {
    // Check if the user already reviewed this book
    const existingReview = await prisma.review.findFirst({
      where: { userId: Number(userId), bookId: Number(bookId) },
    });

    if (existingReview) {
      res.status(400).json({ error: "You already reviewed this book" });
      return;
    }

    const review = await prisma.review.create({
      data: {
        userId: Number(userId),
        bookId: Number(bookId),
        comment,
        rating: Number(rating),
      },
      include: { user: { select: { id: true, name: true } } }, // Return user details
    });

    res.status(201).json(review);
  } catch {
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const { comment, rating } = req.body;
  const userId = req.user!.id;

  try {
    const review = await prisma.review.update({
      where: { id: Number(reviewId), userId: Number(userId) },
      data: { comment, rating: Number(rating) },
    });

    res.json(review);
  } catch {
    res.status(404).json({ error: "Review not found or unauthorized" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const userId = req.user!.id;

  try {
    await prisma.review.delete({
      where: { id: Number(reviewId), userId: Number(userId) },
    });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Review not found or unauthorized" });
  }
};

export const getBookReviews = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { bookId: Number(bookId) },
      include: { user: { select: { id: true, name: true } } }, // Include user details
    });
    res.json(reviews);
  } catch {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
