import container from '@/server/container';
import { UserController } from '@/server/controllers/user.controller';
import { passportAuthenticate, passportInitialize } from '@/server/passport';
import { sessions } from '@/server/sessions';

export default container
  .resolve<UserController>('userController')
  .handler('/api/user/sign-in', [sessions, passportInitialize, passportAuthenticate]);
