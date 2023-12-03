import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';
import { apiErrorHandler } from '@/server/handlers/api-error.handler';
import { notFoundHandler } from '@/server/handlers/not-found.handler';
import { GetPropertyByIdParams } from '@/server/params/property.params';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { INextApiRequestExtended } from '@/server/types/http.types';
import { tryCatchController } from '@/server/wrappers/try-catch-controller.wrapper';
import type { NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

const router = createRouter<INextApiRequestExtended<{}, GetPropertyByIdParams>, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession);

const propertyController: PropertyController = container.resolve<PropertyController>('propertyController');

router.get("/api/properties/:propertyId", tryCatchController(propertyController.getPropertyById));
router.patch("/api/properties/:propertyId", tryCatchController(propertyController.updatePropertyById));

export default router.handler({
  onError: apiErrorHandler,
  onNoMatch: notFoundHandler
});
