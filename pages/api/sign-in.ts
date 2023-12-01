import container from '@/server/container';
import { UserController } from '@/server/controllers/user.controller';
import { passportAuthenticate, passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { INextApiRequestExtended } from '@/server/types/http.types';
import type { NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

const userController = container.resolve<UserController>('userController');

const router = createRouter<INextApiRequestExtended, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession)
  .use(passportAuthenticate);

router.post("/api/sign-in", userController.signIn);

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).end('Something went wrong!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});
