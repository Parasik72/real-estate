import { NextApiResponse } from "next";
import { INextApiRequestExtended, QueryType } from "../types/http.types";
import { HttpException } from "../exceptions/http.exception";
import { ControllerConfig } from "../types/controller.types";

export const tryCatchController = <TBody extends Object = {}, TQuery extends QueryType = {}>(
  controllerFunc: (config: ControllerConfig<TBody, TQuery>) => Promise<any>,
  expectedStatusCode: number = 200
) => {
  return async (req: INextApiRequestExtended<TBody, TQuery>, res: NextApiResponse) => {
    try {
      return res.status(expectedStatusCode).json(await controllerFunc({
        body: req.body,
        query: req.query,
        user: req.user,
        req,
        res
      }));
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Server error.' });
    }
  }
}