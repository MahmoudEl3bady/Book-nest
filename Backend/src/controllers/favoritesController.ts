import { Request, Response } from "express";
import { User } from "@prisma/client";
import db from "../config/prismaClient.js";

/**
 * Get user favorites
 */
export const getUserFavorites = async (req: Request, res: Response) => {
  try {
    const user: User = req.user!;

    // Fetch the user with their favorites from the database
    const userWithFavorites = await db.user.findUnique({
      where: { id: user.id },
      include: {
        favorites: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!userWithFavorites) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Extract the books from the favorites relationship
    const favoriteBooks = userWithFavorites.favorites.map(
      (favorite) => favorite.book
    );

    res.status(200).json({ favorites: favoriteBooks });
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
      where: { id: parseInt(bookId) },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    // Check if already a favorite
    const existingFavorite = await db.userFavorite.findUnique({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: parseInt(bookId),
        },
      },
    });

    if (existingFavorite) {
      res.status(400).json({ error: "Book is already in favorites" });
      return;
    }

    // Add the book to the user's favorites
    await db.userFavorite.create({
      data: {
        user: { connect: { id: user.id } },
        book: { connect: { id: parseInt(bookId) } },
      },
    });

    // Get all favorites with book details to return
    const userWithFavorites = await db.user.findUnique({
      where: { id: user.id },
      include: {
        favorites: {
          include: {
            book: true,
          },
        },
      },
    });

    // Extract the books from the favorites relationship
    const favoriteBooks =
      userWithFavorites?.favorites.map((favorite) => favorite.book) || [];

    res.status(201).json(favoriteBooks);
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
      where: { id: parseInt(bookId) },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    // Remove the book from the user's favorites
    await db.userFavorite.delete({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: parseInt(bookId),
        },
      },
    });

    // Get updated favorites list with book details
    const userWithFavorites = await db.user.findUnique({
      where: { id: user.id },
      include: {
        favorites: {
          include: {
            book: true,
          },
        },
      },
    });

    // Extract the books from the favorites relationship
    const favoriteBooks =
      userWithFavorites?.favorites.map((favorite) => favorite.book) || [];

    res.status(200).json(favoriteBooks);
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};
