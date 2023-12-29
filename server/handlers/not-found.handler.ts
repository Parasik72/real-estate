import type { INextApiRequestExtended, INextApiResponseExtended } from "../types/http.types";

export const notFoundHandler = (
  req: INextApiRequestExtended,
  res: INextApiResponseExtended
) => {
  res.status(404).end('Page is not found');
};