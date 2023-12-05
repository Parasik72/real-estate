import { User } from "@/db/models/user";
import { INextApiRequestExtended, QueryType } from "./http.types";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

export interface ControllerConfig<
  TBody extends Object = {},
  TQuery extends QueryType = {}
> {
  query: TQuery;
  body: TBody;
  req: INextApiRequestExtended<TBody, TQuery>;
  res: NextApiResponse;
  user?: User;
  files?: Express.Multer.File[];
}

export type MiddlewareType = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => Promise<any>;