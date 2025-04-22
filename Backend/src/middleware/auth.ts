import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import logger from "../utils/logger.js";

const JSON_WEB_TOKEN_SECRET: string = process.env.JWT_SECRET || "";
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }

    jwt.verify(token, JSON_WEB_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }
      if (typeof user === "string" || user === undefined) {
        return res.status(403).json({ message: "Invalid user data." });
      }

      req.user = user as User;
      next();
    });
  } catch {
    logger.error("Internal server error");
    res.status(500).json({ message: "Internal server error." });
  }
}
