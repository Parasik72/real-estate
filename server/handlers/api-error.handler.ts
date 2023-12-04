import { NextApiRequest, NextApiResponse } from "next";
import { HttpException } from "../exceptions/http.exception";

export const apiErrorHandler = (
  err: any,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: `Server error:\n${err.message}` });
};