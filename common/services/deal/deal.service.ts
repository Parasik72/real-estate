import Router from 'next/router';
import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { DealsPageResponse } from "./deal.interfaces";
import { DealModel } from "./deal.model";
import { schema } from "normalizr";
import { call } from "redux-saga/effects";
import { ReducerMethods } from "@/common/store/reducer.methods";
import { FRONT_PATHS } from '@/common/constants/front-paths.constants';
import action from '@/common/decorators/action.decorator';
import reducer, { InitSchemaReducer } from '@/common/decorators/reducer.decorator';
import { Entities } from '@/common/store/entities/entities.enum';
import pager from '@/common/decorators/pager.decorator';
import { Paginations } from '@/common/store/paginations/paginations.enum';

export enum DealEffectActions {
    GET_REQUESTED_BY_ME_DEALS = 'deals_getRequestedByMeDeals',
    GET_REQUESTED_FOR_ME_DEALS = 'deals_getRequestedForMeDeals',
    GET_MY_SUCCESSFUL_DEALS = 'deals_getMySuccessfulDeals',
    SIGN_DEAL = 'deals_signDeal',
    CANCEL_DEAL = 'deals_cancelDeal',
    SEND_DEAL = 'deals_sendDeal',
}

const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
const propertySchema = new schema.Entity(
    'properties', 
    { PropertyImages: [propertyImageSchema] }, 
    { idAttribute: 'propertyId' }
);
const userSchema = new schema.Entity('users', {}, { idAttribute: 'userId' });
const initSchema: InitSchemaReducer = {
    definitions: { Property: propertySchema, buyer: userSchema, seller: userSchema },
    options: { idAttribute: 'dealId' }
}

@reducer({ entityName: Entities.Deal, initSchema })
export class DealService extends HttpService {
    @action()
    @pager(Paginations.RequestedByMeDealsPage)
    public *getRequestedByMeDeals(page: number) {
        yield call(
            this.get<DealsPageResponse>, 
            { url: `${BACK_PATHS.getDeals}?page=${page}&requestedBy=Buyer` },
            ReducerMethods.UPDATE
        );
    }

    @action()
    @pager(Paginations.RequestedForMeDealsPage)
    public *getRequestedForMeDeals(payload: number) {
        yield call(
            this.get<DealsPageResponse>, 
            { url: `${BACK_PATHS.getDeals}?page=${payload}&requestedBy=Seller` },
            ReducerMethods.UPDATE
        );
    }

    @action()
    @pager(Paginations.MySuccessfulDealsPage)
    public *getMySuccessfulDeals(payload: number) {
        yield call(
            this.get<DealsPageResponse>, 
            { url: `${BACK_PATHS.getDeals}?page=${payload}&dealStatusName=Done` },
            ReducerMethods.UPDATE
        );
    }

    @action()
    public *signDeal(payload: {
        dealId: string;
    }) {
        const res: Object = yield call(
            this.post<{}, { message: string, deal: DealModel }>, 
            { url: BACK_PATHS.signDeal.replace(':dealId', payload.dealId) },
            ReducerMethods.UPDATE
        );
        if (res instanceof Error) return;
        Router.push(FRONT_PATHS.offers);
    }

    @action()
    public *cancelDeal(payload: {
        dealId: string;
    }) {
        const res: Object = yield call(
            this.post<{}, { message: string }>, 
            { url: BACK_PATHS.cancelDeal.replace(':dealId', payload.dealId) },
            ReducerMethods.DELETE
        );
        if (res instanceof Error) return;
    }

    @action()
    public *sendDeal(payload: {
        propertyId: string;
    }) {
        const res: Object = yield call(
            this.post<{}, { message: string }>, 
            { url: BACK_PATHS.sendDeal.replace(':propertyId', payload.propertyId) },
            ReducerMethods.UPDATE
        );
        if (res instanceof Error) return;
        Router.push(FRONT_PATHS.offers);
    }
}