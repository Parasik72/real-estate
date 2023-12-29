import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';

export default container
  .resolve<PropertyController>('PropertyController')
  .handler('/api/properties/user/:userId');
