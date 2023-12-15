import { dealService } from "@/common/services/deal/deal.service";

export default [
    dealService.cancelDeal(),
    dealService.getMySuccessfulDeals(),
    dealService.getRequestedByMeDeals(),
    dealService.getRequestedForMeDeals(),
    dealService.sendDeal(),
    dealService.signDeal(),
];