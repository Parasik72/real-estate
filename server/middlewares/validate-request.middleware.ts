import { NextApiResponse } from "next";
import { INextApiRequestExtended } from "../types/http.types";
import { HttpException } from "../exceptions/http.exception";
import { NextHandler } from "next-connect";

export const validateRequest = 
  (req: INextApiRequestExtended, res: NextApiResponse, next: NextHandler) => {
    try {
        if (req.errors && req.errors.length > 0) {
            throw new HttpException(req.errors[0].message, req.errors[0].statusCode);
        }
        return next();
    } catch (error) {
        if (!res.status) return error;
        if (error instanceof HttpException) {
          return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: `Server error:\n${error}` });
    }
}