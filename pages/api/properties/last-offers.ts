import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';
import { apiErrorHandler } from '@/server/middlewares/error-handler.middleware';
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
  .use(passportSession);

const propertyController: PropertyController = container.resolve<PropertyController>('propertyController');

router.get("/api/properties/last-offers", tryCatchController(propertyController.getLastOffers));

export default router.handler({
  onError: apiErrorHandler,
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});
