import container from '@/server/container';
import { DealController } from '@/server/controllers/deal.controller';

export default container
  .resolve<DealController>('DealController')
  .handler('/api/deals/cancel/:dealId');