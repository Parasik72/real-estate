import { StoreEntity } from "../types/store.types";
import { DealModel } from "@/common/services/deal/deal.model";

export enum DealActions {
    SET_DEALS = "SET_DEALS",
};

export interface SetDealsAction {
    type: DealActions.SET_DEALS,
    payload: StoreEntity<DealModel>;
}

export type DealAction = SetDealsAction