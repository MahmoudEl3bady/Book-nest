import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
export const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err: any) => ({
      field: err.param,
      message: err.msg,
    }));
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};
