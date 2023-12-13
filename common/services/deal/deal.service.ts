import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { DealsPageResponse } from "./deal.interfaces";
import { DealModel } from "./deal.model";

class DealService extends HttpService {
    async getRequestedByMeDeals(): Promise<DealsPageResponse | null> {
        const data = await this.get<DealsPageResponse>({
            url: `${BACK_PATHS.getDeals}?requestedBy=Buyer`
        });
        if (!data) return null;
        return data;
    }

    async getRequestedForMeDeals(): Promise<DealsPageResponse | null> {
        const data = await this.get<DealsPageResponse>({
            url: `${BACK_PATHS.getDeals}?requestedBy=Seller`
        });
        if (!data) return null;
        return data;
    }

    async getMySuccessfulDeals(): Promise<DealsPageResponse | null> {
        const data = await this.get<DealsPageResponse>({
            url: `${BACK_PATHS.getDeals}?dealStatusName=Done`
        });
        if (!data) return null;
        return data;
    }

    async signDeal(dealId: string): Promise<{ message: string, deal: DealModel } | null> {
        const data = await this.post<{}, { message: string, deal: DealModel }>({
            url: BACK_PATHS.signDeal.replace(':dealId', dealId)
        });
        if (!data) return null;
        return data;
    }

    async cancelDeal(dealId: string): Promise<{ message: string } | null> {
        const data = await this.post<{}, { message: string }>({
            url: BACK_PATHS.cancelDeal.replace(':dealId', dealId)
        });
        if (!data) return null;
        return data;
    }

    async sendDeal(propertyId: string): Promise<{ message: string } | null> {
        const data = await this.post<{}, { message: string }>({
            url: BACK_PATHS.sendDeal.replace(':propertyId', propertyId)
        });
        if (!data) return null;
        return data;
    }
}

export const dealService = new DealService;