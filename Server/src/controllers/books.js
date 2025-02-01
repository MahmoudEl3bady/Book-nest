import prisma from "../../prismaClient.js";

export const getBooks = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  try {
    const books = await prisma.book.findMany({
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });
    res.status(200).json({ books });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error when getting books ${error.message}` });
  }
};
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for books by title, author, or genre
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { author: { contains: query, mode: "insensitive" } },
          { genre: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found matching your search" });
    }

    res.status(200).json({ books });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error searching for books: ${error.message}` });
  }
};
