import { User } from "@/db/models/user";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

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

export interface INextApiResponseExtended extends NextApiResponse, ServerResponse {}

export interface INextPageContextExtended<
  TBody extends Object = {},
  TQuery extends QueryType = {}
> extends NextPageContext {
  user?: User;
  query: TQuery;
  req: INextApiRequestExtended<TBody, TQuery>;
  res: NextApiResponse;
}