import { User } from "@/db/models/user";
import { NextApiRequest } from "next";

type QueryType = { [key: string]: string | string[]; };

export interface INextApiRequestExtended<
    TBody extends Object = {},
    TQuery extends QueryType = {}
> extends NextApiRequest {
  query: TQuery;
  body: TBody;
  user?: User;
}