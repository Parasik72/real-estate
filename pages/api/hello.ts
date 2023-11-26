import type { NextApiRequest, NextApiResponse } from 'next'

interface IResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  res.status(200).json({ message: 'Hello world!' })
}
