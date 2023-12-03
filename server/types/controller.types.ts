import { User } from "@/db/models/user";
import { INextApiRequestExtended, QueryType } from "./http.types";
import { NextApiResponse } from "next";

export interface ControllerConfig<
  TBody extends Object = {},
  TQuery extends QueryType = {}
> {
  query: TQuery;
  body: TBody;
  req: INextApiRequestExtended<TBody, TQuery>;
  res: NextApiResponse;
  user?: User;
}