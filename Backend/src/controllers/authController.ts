import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN } from "../constants";
import prisma from "../config/prismaClient";
import { Bookshelf } from "@prisma/client";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// Default shelf names used for system defaults
export const DEFAULT_SHELF_NAMES = {
  CURRENTLY_READING: "Currently-reading",
  READ: "Read",
  TO_READ: "To-read",
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: RegisterRequestBody = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Use a transaction to ensure user and shelves are created atomically
    const user = await prisma.$transaction(async (tx) => {
      // Create user and get the result in a single operation
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Create default shelves using the user ID from the creation result
      const defaultShelves = [
        {
          name: DEFAULT_SHELF_NAMES.CURRENTLY_READING,
          description: "List of the currently reading books",
          isPrivate: false,
          userId: newUser.id,
        },
        {
          name: DEFAULT_SHELF_NAMES.READ,
          description: "List of the read books",
          isPrivate: false,
          userId: newUser.id,
        },
        {
          name: DEFAULT_SHELF_NAMES.TO_READ,
          description: "List of the user's books to read",
          isPrivate: false,
          userId: newUser.id,
        },
      ];

      for (const shelf of defaultShelves) {
        await tx.bookshelf.create({
          data: shelf,
        });
      }

      return newUser;
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: LoginRequestBody = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Incorrect email and password!");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: `Error during login: ${error.message}` });
  }
};

export const logout = async (_: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User doesn't exist");
    }
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully!" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error?.message,
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const updatedData = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });
    console.log(updatedUser);
    res.status(200).json({
      message: "Your profile updated successfully!",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(error?.message);
    res.status(400).json({ error: error.message });
  }
};
