import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { IUser } from "./user.types";
import { Dispatch } from "redux";

export type QueryType = { [key: string]: string | string[]; };

export interface INextApiRequestExtended<
    TBody extends Object = {},
    TQuery extends QueryType = {}
> extends NextApiRequest, IncomingMessage {
  query: TQuery;
  body: TBody;
  user?: IUser;
  files?: Express.Multer.File[];
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
  dispatch: (action: {
    [key: string]: Object,
    type: string 
  }) => Dispatch;
}