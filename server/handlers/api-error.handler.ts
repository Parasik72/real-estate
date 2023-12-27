import { NextApiRequest, NextApiResponse } from "next";
import { HttpException } from "../exceptions/http.exception";
import { ValidationException } from "../exceptions/validation.exception";

export const apiErrorHandler = (
  err: any,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (err instanceof HttpException || err instanceof ValidationException) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: `Server error:\n${err.message}` });
};
