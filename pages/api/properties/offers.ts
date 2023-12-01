import { User } from '@/db/models/user';
import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

interface INextApiRequestExtended extends NextApiRequest {
  user: User;
}

const router = createRouter<INextApiRequestExtended, NextApiResponse>();
router
  .use(sessions)
  .use(passportInitialize)
  .use(passportSession);

const propertyController = container.resolve<PropertyController>('propertyController');

router.get("/api/properties/offers", propertyController.getAllOffers);

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).end('Something went wrong!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});
