import container from '@/server/container';
import { UserController } from '@/server/controllers/user.controller';
import { SignUpDto } from '@/server/dto/user/sign-up.dto';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { INextApiRequestExtended } from '@/server/types/http.types';
import type { NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

const userController = container.resolve<UserController>('userController');

const router = createRouter<INextApiRequestExtended<SignUpDto>, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession);

router.post("/api/sign-up", userController.signUp);

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).end('Something went wrong!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});
