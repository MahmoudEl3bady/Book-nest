import { Request, Response } from "express";
import { User } from "@prisma/client";
import db from "../config/prismaClient";

/**
 * Get user favorites
 */
export const getUserFavorites = async (req: Request, res: Response) => {
  try {
    const user: User = req.user!;

    // Fetch the user with their favorites from the database
    const userWithFavorites = await db.user.findUnique({
      where: { id: user.id },
      include: { favorites: true },
    });

    if (!userWithFavorites) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ favorites: userWithFavorites.favorites });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Add a book to user favorites
 */
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const user: User = req.user!;
    const { bookId } = req.body;

    // Check if the book exists
    const book = await db.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    // Add the book to the user's favorites
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          connect: { userId: user.id, bookId: bookId },
        },
      },
      include: { favorites: true },
    });

    res.status(201).json(updatedUser.favorites);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Remove a book from user favorites
 */
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const user: User = req.user!;
    const { bookId } = req.body;

    // Check if the book exists
    const book = await db.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    // Remove the book from the user's favorites
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          disconnect: { id: bookId },
        },
      },
      include: { favorites: true },
    });

    res.status(200).json(updatedUser.favorites);
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};
