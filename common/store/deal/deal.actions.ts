import { 
    DealActions,
    SetDealsAction, 
} from "./deal.action.interface";
import { StoreEntity } from "../types/store.types";
import { DealModel } from "@/common/services/deal/deal.model";

export const setDealsAction = (payload: StoreEntity<DealModel>): SetDealsAction => 
    ({ type: DealActions.SET_DEALS, payload });