import { User } from "@/db/models/user";
import { INextApiRequestExtended, QueryType } from "./http.types";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { IncomingMessage, ServerResponse } from "http";

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

export type MiddlewareType = 
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: NextHandler) => Promise<any>;