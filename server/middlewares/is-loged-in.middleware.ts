import { NextApiResponse } from "next";
import { INextApiRequestExtended } from "../types/http.types";
import { HttpException } from "../exceptions/http.exception";
import { NextHandler } from "next-connect";

export const islogedIn = 
  (req: INextApiRequestExtended, res: NextApiResponse, next: NextHandler) => {
  if (!req.user) throw new HttpException('Unauthorized', 401);
  return next();
}