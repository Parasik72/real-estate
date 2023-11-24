// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '@/db/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 } from 'uuid'
import bcryptjs from 'bcryptjs'
import { dbInstance } from '@/db/db-instance'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // console.log(dbInstance)
  // const user = await User.create({
  //   userId: v4(),
  //   firstName: 'Dmytro',
  //   lastName: 'Gontier',
  //   email: 'd.gontier@gmail.com',
  //   phone: '+380111111777',
  //   password: bcryptjs.hashSync('qwerty'),
  //   createdAt: new Date().getTime(),
  //   updatedAt: new Date().getTime(),
  // })
  res.status(200).json({ message: 'Hello world!' })
}
