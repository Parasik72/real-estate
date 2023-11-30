import { User } from '@/db/models/user';
import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';
import { GetPropertyByIdParams } from '@/server/params/property.params';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import { INextApiRequestExtended } from '@/server/types/http.types';
import type { NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

const router = createRouter<INextApiRequestExtended<{}, GetPropertyByIdParams>, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession);

const propertyController = container.resolve<PropertyController>('propertyController');

router.get("/api/properties/:propertyId", propertyController.getPropertyById);

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).end('Something went wrong!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});
