import { IPagination } from "@/common/types/common.types";
import { StoreEntity } from "../types/store.types";
import { DealModel } from "@/common/services/deal/deal.model";

export interface DealState {
    entities: {
        deals: StoreEntity<DealModel>;
    },
    paginations: {
        requestedByMeDeals?: IPagination;
        requestedForMeDeals?: IPagination;
        mySuccessfulDeals?: IPagination;
    }
}