import prisma from "../config/prismaClient.js";
import { Request, Response } from "express";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  try {
    const books = await prisma.book.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    res.status(200).json({ books });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `Error when getting books ${error.message}` });
  }
};
export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.id, 10);
    console.log("bookId", bookId);
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json({ book });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const searchBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, author } = req.query as {
      title?: string;
      author?: string;
    };

    const whereClause: any = {
      OR: [],
    };

    if (title?.trim()) {
      whereClause.OR.push({
        title: { contains: title.trim() },
      });
    }

    if (author?.trim()) {
      whereClause.OR.push({
        author: { contains: author.trim() },
      });
    }

    // If no valid filters, return error
    if (whereClause.OR.length === 0) {
      res.status(400).json({ error: "Provide title or author to search" });
      return;
    }

    const books = await prisma.book.findMany({
      where: whereClause,
    });

    if (books.length === 0) {
      res.status(404).json({ message: "No books found" });
      return;
    }

    res.status(200).json({ count: books.length, books });
  } catch (error: any) {
    res.status(500).json({ error: `Search failed: ${error.message}` });
  }
};
