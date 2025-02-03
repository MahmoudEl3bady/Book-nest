import { Request, NextFunction } from "express";
export const Logger = (req: Request, _, next: NextFunction) => {
  const method = req.method;
  const path = req.path;
  const timestamp = new Date().toISOString();
  console.log(`${method} ${path} [${timestamp}]`);
  next();
};
