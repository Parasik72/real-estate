import container from '@/server/container';
import { apiErrorHandler } from '@/server/handlers/api-error.handler';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { tryCatchController } from '@/server/wrappers/try-catch-controller.wrapper';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import { notFoundHandler } from '@/server/handlers/not-found.handler';
import { DealController } from '@/server/controllers/deal.controller';
import { isLogedIn } from '@/server/middlewares/is-loged-in.middleware';

const router = createRouter<NextApiRequest, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession)
  .use(isLogedIn);

const dealController = container.resolve<DealController>('dealController');

router.get("/api/deals", tryCatchController(dealController.getAllDeals));

export default router.handler({
  onError: apiErrorHandler,
  onNoMatch: notFoundHandler
});
