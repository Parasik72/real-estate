import container from '@/server/container';
import { UserController } from '@/server/controllers/user.controller';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';

export default container
  .resolve<UserController>('userController')
  .handler(
    '/api/user/profile/:userId',
    [sessions, passportInitialize, passportSession]
  );