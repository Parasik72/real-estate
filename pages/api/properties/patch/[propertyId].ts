import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';

export const config = {
  api: {
    bodyParser: false
  }
};

export default container
  .resolve<PropertyController>('propertyController')
  .handler('/api/properties/patch/:propertyId');
