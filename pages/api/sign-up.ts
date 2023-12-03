import container from '@/server/container';
import { UserController } from '@/server/controllers/user.controller';
import { SignUpDto } from '@/server/dto/user/sign-up.dto';
import { apiErrorHandler } from '@/server/middlewares/error-handler.middleware';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { INextApiRequestExtended } from '@/server/types/http.types';
import { tryCatchController } from '@/server/wrappers/try-catch-controller.wrapper';
import type { NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

const userController: UserController = container.resolve<UserController>('userController');

const router = createRouter<INextApiRequestExtended<SignUpDto>, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession);

router.post("/api/sign-up", tryCatchController(userController.signUp));

export default router.handler({
  onError: apiErrorHandler,
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});
