import { NextApiRequest, NextApiResponse } from "next";

export const notFoundHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return res.status(404).end('Page is not found');
};