import container from '@/server/container';
import { DealController } from '@/server/controllers/deal.controller';

export default container
  .resolve<DealController>('dealController')
  .handler('/api/deals/cancel/:propertyId');