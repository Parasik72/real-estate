import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';
import { apiErrorHandler } from '@/server/handlers/api-error.handler';
import { notFoundHandler } from '@/server/handlers/not-found.handler';
import { islogedIn } from '@/server/middlewares/is-loged-in.middleware';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { INextApiRequestExtended } from '@/server/types/http.types';
import { tryCatchController } from '@/server/wrappers/try-catch-controller.wrapper';
import type { NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

const router = createRouter<INextApiRequestExtended, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession)
  .use(islogedIn);

const propertyController: PropertyController = container.resolve<PropertyController>('propertyController');

router.get("/api/properties/offers", tryCatchController(propertyController.getAllOffers));

export default router.handler({
  onError: apiErrorHandler,
  onNoMatch: notFoundHandler
});
