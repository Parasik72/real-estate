import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { DealsPageResponse } from "./deal.interfaces";
import { DealModel } from "./deal.model";
import { schema } from "normalizr";
import { call, put, take } from "redux-saga/effects";
import { ReducerMethods } from "@/common/store/reducer.methods";
import { SagaEffectAction } from "@/common/store/types/saga.types";

export enum DealEffectActions {
    GET_REQUESTED_BY_ME_DEALS = 'GET_REQUESTED_BY_ME_DEALS',
    GET_REQUESTED_FOR_ME_DEALS = 'GET_REQUESTED_FOR_ME_DEALS',
    GET_MY_SUCCESSFUL_DEALS = 'GET_MY_SUCCESSFUL_DEALS',
    SIGN_DEAL = 'SIGN_DEAL',
    CANCEL_DEAL = 'CANCEL_DEAL',
    SEND_DEAL = 'SEND_DEAL',
}

class DealService extends HttpService {
    constructor() {
        super();
        const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
        const propertySchema = new schema.Entity(
            'properties', 
            { PropertyImages: [propertyImageSchema] }, 
            { idAttribute: 'propertyId' }
        );
        const userSchema = new schema.Entity('users', {}, { idAttribute: 'userId' });
        this.initSchema(
            'deals',
            { Property: propertySchema, buyer: userSchema, seller: userSchema },
            { idAttribute: 'dealId' }
        );
    }
    
    public *getRequestedByMeDeals() {
        while (true) {
            const action: SagaEffectAction<number> = yield take(DealEffectActions.GET_REQUESTED_BY_ME_DEALS);
            yield call(
                this.get<DealsPageResponse>, 
                { url: `${BACK_PATHS.getDeals}?page=${action.payload}&requestedBy=Buyer` },
                ReducerMethods.UPDATE
            );
        }
    }

    public *getRequestedForMeDeals() {
        while (true) {
            const action: SagaEffectAction<number> = yield take(DealEffectActions.GET_REQUESTED_FOR_ME_DEALS);
            yield call(
                this.get<DealsPageResponse>, 
                { url: `${BACK_PATHS.getDeals}?page=${action.payload}&requestedBy=Seller` },
                ReducerMethods.UPDATE
            );
        }
    }

    public *getMySuccessfulDeals() {
        while (true) {
            const action: SagaEffectAction<number> = yield take(DealEffectActions.GET_MY_SUCCESSFUL_DEALS);
            yield call(
                this.get<DealsPageResponse>, 
                { url: `${BACK_PATHS.getDeals}?page=${action.payload}&dealStatusName=Done` },
                ReducerMethods.UPDATE
            );
        }
    }

    public *signDeal() {
        while (true) {
            const action: SagaEffectAction<{
                dealId: string;
                callback: () => void;
            }> = yield take(DealEffectActions.SIGN_DEAL);
            const res: Object = yield call(
                this.post<{}, { message: string, deal: DealModel }>, 
                { url: BACK_PATHS.signDeal.replace(':dealId', action.payload.dealId) },
                ReducerMethods.UPDATE
            );
            if (res instanceof Error) continue;
            action.payload.callback();
        }
    }

    public *cancelDeal() {
        while (true) {
            const action: SagaEffectAction< {
                dealId: string;
                callback: () => void;
            }> = yield take(DealEffectActions.CANCEL_DEAL);
            const res: Object = yield call(
                this.post<{}, { message: string }>, 
                { url: BACK_PATHS.cancelDeal.replace(':dealId', action.payload.dealId) },
                ReducerMethods.DELETE
            );
            if (res instanceof Error) continue;
            action.payload.callback();
        }
    }

    public *sendDeal() {
        while (true) {
            const action: SagaEffectAction<{
                propertyId: string;
                callback: () => void;
            }> = yield take(DealEffectActions.SEND_DEAL);
            const res: Object = yield call(
                this.post<{}, { message: string }>, 
                { url: BACK_PATHS.sendDeal.replace(':propertyId', action.payload.propertyId) },
                ReducerMethods.UPDATE
            );
            if (res instanceof Error) continue;
            action.payload.callback();
        }
    }
}

export const dealService = new DealService;