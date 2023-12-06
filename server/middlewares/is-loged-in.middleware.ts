import { NextApiResponse } from "next";
import { INextApiRequestExtended } from "../types/http.types";
import { HttpException } from "../exceptions/http.exception";
import { NextHandler } from "next-connect";

export const isLogedIn = 
  (req: INextApiRequestExtended, res: NextApiResponse, next: NextHandler) => {
    try {
      if (!req.user) throw new HttpException('Unauthorized', 401);
      return next();
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: `Server error:\n${error}` });
    }
}