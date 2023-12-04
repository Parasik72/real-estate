import container from '@/server/container';
import { DealController } from '@/server/controllers/deal.controller';
import { apiErrorHandler } from '@/server/handlers/api-error.handler';
import { notFoundHandler } from '@/server/handlers/not-found.handler';
import { isLogedIn } from '@/server/middlewares/is-loged-in.middleware';
import { CancelDealParams } from '@/server/params/deal.params';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { INextApiRequestExtended } from '@/server/types/http.types';
import { tryCatchController } from '@/server/wrappers/try-catch-controller.wrapper';
import type { NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

const router = createRouter<INextApiRequestExtended<{}, CancelDealParams>, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession)
  .use(isLogedIn);

const dealController = container.resolve<DealController>('dealController');

router.post("/api/deals/cancel/:dealId", tryCatchController(dealController.cancelDeal));

export default router.handler({
  onError: apiErrorHandler,
  onNoMatch: notFoundHandler
});
