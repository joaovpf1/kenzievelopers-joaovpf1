import { NextFunction, Request, Response } from "express";
import AppError from "../errors";

export const handleErrors = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log(error);
  return res.status(500).json({ message: "Internal server Error." });
};
