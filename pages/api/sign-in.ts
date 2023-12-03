import container from '@/server/container';
import { UserController } from '@/server/controllers/user.controller';
import { apiErrorHandler } from '@/server/middlewares/error-handler.middleware';
import { passportAuthenticate, passportInitialize } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { tryCatchController } from '@/server/wrappers/try-catch-controller.wrapper';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

const userController: UserController = container.resolve<UserController>('userController');

const router = createRouter<NextApiRequest, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportAuthenticate);

router.post("/api/sign-in", tryCatchController(userController.signIn));

export default router.handler({
  onError: apiErrorHandler,
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});
