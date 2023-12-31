import type { NextApiResponse } from "next";
import type { INextApiRequestExtended } from "../types/http.types";
import { HttpException } from "../exceptions/http.exception";
import type { NextHandler } from "next-connect";

export const isLogedIn = 
  (req: INextApiRequestExtended, res: NextApiResponse, next: NextHandler) => {
    try {
      if (!req.user) throw new HttpException('Unauthorized', 401);
      return next();
    } catch (error) {
      if (!res.status) return;
      if (error instanceof HttpException) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: `Server error:\n${error}` });
    }
}