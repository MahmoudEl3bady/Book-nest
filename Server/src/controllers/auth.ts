import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN } from "../constants";
import prisma from "../config/prismaClient";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: RegisterRequestBody = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new Error("User already exists");
    }
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
      throw new Error("User already exists");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: `Error during login: ${error.message}` });
  }
};
