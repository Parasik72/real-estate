import { StoreEntity } from "../types/store.types";
import { DealModel } from "@/common/services/deal/deal.model";

export interface DealState {
    entities: {
        deals: StoreEntity<DealModel>;
    }
}