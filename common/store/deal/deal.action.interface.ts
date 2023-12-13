import { IPagination } from "@/common/types/common.types";
import { StoreEntity } from "../types/store.types";
import { DealModel } from "@/common/services/deal/deal.model";

export enum DealActions {
    SET_DEALS = 'SET_DEALS',
    ADD_DEALS = 'ADD_DEALS',
    SET_REQ_BY_ME_DEALS_PAGE = 'SET_REQ_BY_ME_DEALS_PAGE',
    SET_REQ_FOR_ME_DEALS_PAGE = 'SET_REQ_FOR_ME_DEALS_PAGE',
    SET_MY_SUCCESS_DEALS_PAGE = 'SET_MY_SUCCESS_DEALS_PAGE',
};

export interface SetDealsAction {
    type: DealActions.SET_DEALS,
    payload: StoreEntity<DealModel>;
}

export interface AddDealsAction {
    type: DealActions.ADD_DEALS,
    payload: StoreEntity<DealModel>;
}

export interface SetReqByMeDealsAction {
    type: DealActions.SET_REQ_BY_ME_DEALS_PAGE,
    payload: IPagination;
}

export interface SetReqForMeDealsAction {
    type: DealActions.SET_REQ_FOR_ME_DEALS_PAGE,
    payload: IPagination;
}

export interface SetMySuccessDealsAction {
    type: DealActions.SET_MY_SUCCESS_DEALS_PAGE,
    payload: IPagination;
}

export type DealAction = SetDealsAction 
                       | AddDealsAction
                       | SetReqByMeDealsAction
                       | SetReqForMeDealsAction
                       | SetMySuccessDealsAction;