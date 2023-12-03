import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';
import { apiErrorHandler } from '@/server/handlers/api-error.handler';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { tryCatchController } from '@/server/wrappers/try-catch-controller.wrapper';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import multer from "multer";
import { notFoundHandler } from '@/server/handlers/not-found.handler';

export const config = {
  api: {
    bodyParser: false
  }
};

const router = createRouter<NextApiRequest, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession)
  .use(multer().any() as any);

const propertyController: PropertyController = container.resolve<PropertyController>('propertyController');

router.post("/api/properties", tryCatchController(propertyController.createProperty, 201));

export default router.handler({
  onError: apiErrorHandler,
  onNoMatch: notFoundHandler
});
