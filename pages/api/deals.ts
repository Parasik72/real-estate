import container from '@/server/container';
import { DealController } from '@/server/controllers/deal.controller';
import { isLogedIn } from '@/server/middlewares/is-loged-in.middleware';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';

export default container
  .resolve<DealController>('dealController')
  .handler(
    '/api/deals',
    [sessions, passportInitialize, passportSession, isLogedIn]
  );