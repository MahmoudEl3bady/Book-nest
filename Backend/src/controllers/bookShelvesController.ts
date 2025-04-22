import { Request, Response } from "express";
import prisma from "../config/prismaClient.js";
import { DEFAULT_SHELF_NAMES } from "./authController.js";

export const addNewShelf = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.user?.id;
    const shelfData = req.body;

    const newShelf = await prisma.bookshelf.create({
      data: { ...shelfData, userId },
    });

    return res.status(201).json({
      message: "Book Shelf created successfully!",
      data: newShelf,
    });
  } catch (error: any) {
    console.error("Error creating new shelf: ", error.message);
    return res.status(400).json({
      error: `Error creating new shelf: ${error.message}`,
    });
  }
};

export const getUserShelves = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.params.userId
      ? parseInt(req.params.userId)
      : req.user?.id;

    if (!userId) {
      return res.status(400).json({
        error: "User ID is required",
      });
    }

    const where = {
      userId: userId,
      ...(userId !== req.user?.id ? { isPrivate: false } : {}),
    };

    const userShelves = await prisma.bookshelf.findMany({
      where,
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Shelves retrieved successfully",
      data: userShelves,
    });
  } catch (error: any) {
    console.error("Error fetching user shelves!", error.message);
    return res.status(400).json({
      error: `Error fetching user shelves: ${error.message}`,
    });
  }
};

export const addBookToShelf = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { bookshelfId } = req.params;
    const { bookId } = req.body;
    const userId = req.user?.id;

    const shelf = await prisma.bookshelf.findUnique({
      where: {
        id: parseInt(bookshelfId),
      },
    });

    if (!shelf) {
      return res.status(404).json({ error: "Shelf not found" });
    }

    if (shelf.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const bookshelfBook = await prisma.bookshelfBook.create({
      data: {
        bookshelfId: parseInt(bookshelfId),
        bookId: parseInt(bookId),
      },
    });

    return res.status(200).json({
      message: "Book added to shelf successfully!",
      data: bookshelfBook,
    });
  } catch (error: any) {
    console.error("Error adding book to shelf!", error.message);
    return res.status(400).json({
      error: `Error adding book to shelf: ${error.message}`,
    });
  }
};

export const removeBookFromShelf = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { bookshelfId, bookId } = req.params;
    const userId = req.user?.id;

    const shelf = await prisma.bookshelf.findUnique({
      where: {
        id: parseInt(bookshelfId),
      },
    });

    if (!shelf) {
      return res.status(404).json({ error: "Shelf not found" });
    }

    if (shelf.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await prisma.bookshelfBook.delete({
      where: {
        bookshelfId_bookId: {
          bookshelfId: parseInt(bookshelfId),
          bookId: parseInt(bookId),
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Book removed from shelf successfully!" });
  } catch (error: any) {
    console.error("Error removing book from shelf!", error.message);
    return res.status(400).json({
      error: `Error removing book from shelf: ${error.message}`,
    });
  }
};

export const deleteShelf = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { bookshelfId } = req.params;
    const userId = req.user?.id;

    const shelf = await prisma.bookshelf.findUnique({
      where: {
        id: parseInt(bookshelfId),
      },
    });

    if (!shelf) {
      return res.status(404).json({ error: "Shelf not found" });
    }

    if (shelf.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Prevent deletion of default shelves
    const defaultShelfNames = Object.values(DEFAULT_SHELF_NAMES);
    if (defaultShelfNames.includes(shelf.name)) {
      return res.status(400).json({
        error: "Cannot delete default system shelves",
      });
    }

    await prisma.bookshelf.delete({
      where: {
        id: parseInt(bookshelfId),
      },
    });

    return res.status(200).json({ message: "Shelf deleted successfully!" });
  } catch (error: any) {
    console.error("Error deleting shelf!", error.message);
    return res.status(400).json({
      error: `Error deleting shelf: ${error.message}`,
    });
  }
};
