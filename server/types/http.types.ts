import { User } from "@/db/models/user";
import { IncomingMessage } from "http";
import { NextApiRequest } from "next";

export type QueryType = { [key: string]: string | string[]; };

export interface INextApiRequestExtended<
    TBody extends Object = {},
    TQuery extends QueryType = {}
> extends NextApiRequest, IncomingMessage {
  query: TQuery;
  body: TBody;
  user?: User;
  files?: Express.Multer.File[];
}