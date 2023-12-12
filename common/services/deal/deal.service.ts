import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { DealModel } from "./deal.model";
import { DealsPageResponse } from "./deal.interfaces";

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
}

export const dealService = new DealService;