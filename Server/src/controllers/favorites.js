import db from "../../prismaClient.js";
export const getUserFavorites = async (req, res) => {
  try {
    const user = req.user;
    const userFavorites = user.favorites;
    res.status(200).json({ userFavorites: userFavorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const user = req.user;
    const { bookId } = req.body;

    const book = await db.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorites: {
          connect: {
            id: bookId,
          },
        },
      },
      include: {
        favorites: true,
      },
    });

    res.status(201).json(updatedUser.favorites);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const user = req.user;
    const { bookId } = req.body;

    const book = await db.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorites: {
          disconnect: {
            id: bookId,
          },
        },
      },
    });

    res.status(200).json(updatedUser.favorites);
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: error.message });
  }
};
