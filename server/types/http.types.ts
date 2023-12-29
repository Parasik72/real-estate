import type { IncomingMessage, ServerResponse } from "http";
import type { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import type { IUser } from "./user.types";

export type QueryType = { [key: string]: string | string[]; };

export interface INextApiRequestExtended<
    TBody extends Object = {},
    TQuery extends QueryType = {}
> extends NextApiRequest, IncomingMessage {
  query: TQuery;
  body: TBody;
  user?: IUser;
  files?: Express.Multer.File[];
  errors?: { statusCode: number, message: string }[];
  logout?: () => any;
}

export interface INextApiResponseExtended extends NextApiResponse, ServerResponse {}

export interface INextPageContextExtended<
  TBody extends Object = {},
  TQuery extends QueryType = {}
> extends NextPageContext {
  user?: IUser;
  routePath?: string;
  query: TQuery;
  req: INextApiRequestExtended<TBody, TQuery>;
  res: NextApiResponse;
}