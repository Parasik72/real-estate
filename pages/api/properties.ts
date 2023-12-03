import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';
import { apiErrorHandler } from '@/server/middlewares/error-handler.middleware';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { tryCatchController } from '@/server/wrappers/try-catch-controller.wrapper';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession);

const propertyController: PropertyController = container.resolve<PropertyController>('propertyController');

router.post("/api/properties", tryCatchController(propertyController.createProperty, 201));

export default router.handler({
  onError: apiErrorHandler,
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});
