import { 
    AddDealsAction,
    CancelDealAction,
    DealActions,
    SetDealsAction,
    SetMySuccessDealsAction,
    SetReqByMeDealsAction,
    SetReqForMeDealsAction,
    SignDealAction,
} from "./deal.action.interface";
import { StoreEntity } from "../types/store.types";
import { DealModel } from "@/common/services/deal/deal.model";
import { IPagination } from "@/common/types/common.types";

export const setDealsAction = (payload: StoreEntity<DealModel>): SetDealsAction => 
    ({ type: DealActions.SET_DEALS, payload });

export const addDealsAction = (payload: StoreEntity<DealModel>): AddDealsAction => 
    ({ type: DealActions.ADD_DEALS, payload });

export const setReqByMeDealsAction = (payload: IPagination): SetReqByMeDealsAction => 
    ({ type: DealActions.SET_REQ_BY_ME_DEALS_PAGE, payload });

export const setReqForMeDealsAction = (payload: IPagination): SetReqForMeDealsAction => 
    ({ type: DealActions.SET_REQ_FOR_ME_DEALS_PAGE, payload });

export const setMySuccessDealsAction = (payload: IPagination): SetMySuccessDealsAction => 
    ({ type: DealActions.SET_MY_SUCCESS_DEALS_PAGE, payload });

export const signDealAction = (payload: DealModel): SignDealAction => 
    ({ type: DealActions.SIGN_DEAL, payload });

export const cancelDealAction = (payload: string): CancelDealAction => 
    ({ type: DealActions.CANCEL_DEAL, payload });