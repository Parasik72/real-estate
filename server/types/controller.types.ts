import { INextApiRequestExtended, INextApiResponseExtended, QueryType } from "./http.types";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "./user.types";
import { Model } from "sequelize";

export interface ControllerConfig<
  TBody extends Object = {},
  TQuery extends QueryType = {}
> {
  query: TQuery;
  body: TBody;
  req: INextApiRequestExtended<TBody, TQuery>;
  res: INextApiResponseExtended;
  user?: IUser;
  files?: Express.Multer.File[];
}

export type MiddlewareType = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => Promise<any>;
export type MiddlewareTypeSSR = 
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: NextHandler) => Promise<any>;

export interface IPage {
  page: number;
  limit: number;
  offset: number;
  totalPages: number;
  paginationName: string;
  query: Record<string, string | number | undefined>;
}

export interface IPager<T extends Model> {
  pager: IPage,
  [paginationName: string]: T[] | IPage;
}
