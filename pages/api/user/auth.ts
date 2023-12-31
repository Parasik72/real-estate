import container from '@/server/container';
import { UserController } from '@/server/controllers/user.controller';

export default container
  .resolve<UserController>('UserController')
  .handler('/api/user/auth');
