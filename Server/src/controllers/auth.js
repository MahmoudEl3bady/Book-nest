import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN } from "../constants/index.js";
import prisma from "../../prismaClient.js";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const JSON_WEB_TOKEN_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, JSON_WEB_TOKEN_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: `Error during login: ${error.message}` });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error getting user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.user;
  const { name, email } = req.body;

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: `Error updating user: ${error.message}` });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.user;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
