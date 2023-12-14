import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { DealsPageResponse } from "./deal.interfaces";
import { DealModel } from "./deal.model";

class DealService extends HttpService {
    async getRequestedByMeDeals(page: number): Promise<DealsPageResponse | null> {
        return this.get<DealsPageResponse>({
            url: `${BACK_PATHS.getDeals}?page=${page}&requestedBy=Buyer`
        });
    }

    async getRequestedForMeDeals(page: number): Promise<DealsPageResponse | null> {
        return this.get<DealsPageResponse>({
            url: `${BACK_PATHS.getDeals}?page=${page}&requestedBy=Seller`
        });
    }

    async getMySuccessfulDeals(page: number): Promise<DealsPageResponse | null> {
        return this.get<DealsPageResponse>({
            url: `${BACK_PATHS.getDeals}?page=${page}&dealStatusName=Done`
        });
    }

    async signDeal(dealId: string): Promise<{ message: string, deal: DealModel } | null> {
        return this.post<{}, { message: string, deal: DealModel }>({
            url: BACK_PATHS.signDeal.replace(':dealId', dealId)
        });
    }

    async cancelDeal(dealId: string): Promise<{ message: string } | null> {
        return this.post<{}, { message: string }>({
            url: BACK_PATHS.cancelDeal.replace(':dealId', dealId)
        });
    }

    async sendDeal(propertyId: string): Promise<{ message: string } | null> {
        return this.post<{}, { message: string }>({
            url: BACK_PATHS.sendDeal.replace(':propertyId', propertyId)
        });
    }
}

export const dealService = new DealService;