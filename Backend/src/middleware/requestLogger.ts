import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  (req as Request & { id: string }).id = uuidv4();
  res.setHeader("X-Request-Id", (req as Request & { id: string }).id);
  next();
};
