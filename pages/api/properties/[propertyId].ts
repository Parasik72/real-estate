import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';

export default container
  .resolve<PropertyController>('propertyController')
  .handler('/api/properties/:propertyId');
