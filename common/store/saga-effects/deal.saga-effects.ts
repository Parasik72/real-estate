import { call, put, takeEvery } from "redux-saga/effects";
import { dealService } from "@/common/services/deal/deal.service";
import { normalize, schema } from "normalizr";
import { DealsPageResponse } from "@/common/services/deal/deal.interfaces";
import { Entity } from "../types/store.types";
import { PropertyModel } from "@/common/services/property/property.model";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { UserModel } from "@/common/services/user/user.model";
import { DealModel } from "@/common/services/deal/deal.model";
import { addPropertiesAction, addPropertyImagesAction } from "../property/property.actions";
import { addUsersAction } from "../user/user.actions";
import { 
    addDealsAction, 
    cancelDealAction, 
    setMySuccessDealsAction, 
    setReqByMeDealsAction, 
    setReqForMeDealsAction, 
    signDealAction 
} from "../deal/deal.actions";
import { SagaEffectAction } from "../types/saga.types";

export enum DealEffectActions {
    GET_REQUESTED_BY_ME_DEALS = 'GET_REQUESTED_BY_ME_DEALS',
    GET_REQUESTED_FOR_ME_DEALS = 'GET_REQUESTED_FOR_ME_DEALS',
    GET_MY_SUCCESSFUL_DEALS = 'GET_MY_SUCCESSFUL_DEALS',
    SIGN_DEAL = 'SIGN_DEAL',
    CANCEL_DEAL = 'CANCEL_DEAL',
    SEND_DEAL = 'SEND_DEAL',
}

const normalizeDeals = (response: DealsPageResponse) => {
    const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
    const propertySchema = new schema.Entity(
        'properties', 
        { PropertyImages: [propertyImageSchema] }, 
        { idAttribute: 'propertyId' }
    );
    const userSchema = new schema.Entity('users', {}, { idAttribute: 'userId' });
    const dealSchema = new schema.Entity(
        'deals',
        { Property: propertySchema, buyer: userSchema, seller: userSchema },
        { idAttribute: 'dealId' }
    );
    const normalizrData = normalize(response.deals, [dealSchema]);
    const properties: Entity<PropertyModel> = normalizrData?.entities?.properties || {}; 
    const propertyImages: Entity<PropertyImageModel> = normalizrData?.entities?.propertyImages || {}; 
    const users: Entity<UserModel> = normalizrData?.entities?.users || {}; 
    const deals: Entity<DealModel> = normalizrData?.entities?.deals || {}; 
    const propertiesIds = Object.keys(properties);
    const propertyImagesIds = Object.keys(propertyImages);
    const usersIds = Object.keys(users);
    const dealsIds = Object.keys(deals);
    return {
        properties,
        propertyImages,
        users,
        deals,
        propertiesIds,
        propertyImagesIds,
        usersIds,
        dealsIds
    };
}

function* fetchRequestedByMeDeals(action: SagaEffectAction<number>) {
    try {
        const response: DealsPageResponse = 
            yield call(dealService.getRequestedByMeDeals.bind(dealService, action.payload));
        
        const {
            deals,
            dealsIds,
            properties,
            propertiesIds,
            propertyImages,
            propertyImagesIds,
            users,
            usersIds
        } = normalizeDeals(response);

        yield put(addPropertiesAction({byId: properties, allIds: propertiesIds}));
        yield put(addPropertyImagesAction({ byId: propertyImages, allIds: propertyImagesIds}));
        yield put(addUsersAction({ byId: users, allIds: usersIds}));
        yield put(addDealsAction({ byId: deals, allIds: dealsIds}));
        yield put(setReqByMeDealsAction({ 
            limit: response.limit,
            offset: response.offset,
            page: response.page,
            totalPages: response.totalPages
        }));
    } catch (e) {
        yield put({type: "REQUESTED_BY_ME_DEALS_FAILED", message: e});
    }
}

function* watchRequestedByMeDeals() {
    yield takeEvery(DealEffectActions.GET_REQUESTED_BY_ME_DEALS, fetchRequestedByMeDeals);
}

function* fetchRequestedForMeDeals(action: SagaEffectAction<number>) {
    try {
        const response: DealsPageResponse = 
            yield call(dealService.getRequestedForMeDeals.bind(dealService, action.payload));
        
        const {
            deals,
            dealsIds,
            properties,
            propertiesIds,
            propertyImages,
            propertyImagesIds,
            users,
            usersIds
        } = normalizeDeals(response);

        yield put(addPropertiesAction({byId: properties, allIds: propertiesIds}));
        yield put(addPropertyImagesAction({ byId: propertyImages, allIds: propertyImagesIds}));
        yield put(addUsersAction({ byId: users, allIds: usersIds}));
        yield put(addDealsAction({ byId: deals, allIds: dealsIds}));
        yield put(setReqForMeDealsAction({ 
            limit: response.limit,
            offset: response.offset,
            page: response.page,
            totalPages: response.totalPages
        }));
    } catch (e) {
        yield put({type: "REQUESTED_FOR_ME_DEALS_FAILED", message: e});
    }
}

function* watchRequestedForMeDeals() {
    yield takeEvery(DealEffectActions.GET_REQUESTED_FOR_ME_DEALS, fetchRequestedForMeDeals);
}

function* fetchMySuccessfulDeals(action: SagaEffectAction<number>) {
    try {
        const response: DealsPageResponse = 
            yield call(dealService.getMySuccessfulDeals.bind(dealService, action.payload));
        
        const {
            deals,
            dealsIds,
            properties,
            propertiesIds,
            propertyImages,
            propertyImagesIds,
            users,
            usersIds
        } = normalizeDeals(response);

        yield put(addPropertiesAction({byId: properties, allIds: propertiesIds}));
        yield put(addPropertyImagesAction({ byId: propertyImages, allIds: propertyImagesIds}));
        yield put(addUsersAction({ byId: users, allIds: usersIds}));
        yield put(addDealsAction({ byId: deals, allIds: dealsIds}));
        yield put(setMySuccessDealsAction({ 
            limit: response.limit,
            offset: response.offset,
            page: response.page,
            totalPages: response.totalPages
        }));
    } catch (e) {
        yield put({type: "MY_SUCCESSFUL_DEALS_FAILED", message: e});
    }
}

function* watchMySuccessfulDeals() {
    yield takeEvery(DealEffectActions.GET_MY_SUCCESSFUL_DEALS, fetchMySuccessfulDeals);
}

function* signDeal(action: SagaEffectAction<{
    dealId: string;
    callback?: () => void;
}>) {
    try {
        const response: { message: string, deal: DealModel } = 
            yield call(dealService.signDeal.bind(dealService, action.payload.dealId));
        if (!response) return;
        
        yield put(signDealAction(response.deal));
        if (action.payload.callback) action.payload?.callback();
    } catch (e) {
        yield put({type: "SIGN_DEAL_FAILED", message: e});
    }
}

function* watchSignDeal() {
    yield takeEvery(DealEffectActions.SIGN_DEAL, signDeal);
}

function* cancelDeal(action: SagaEffectAction<{
    dealId: string;
    callback?: () => void;
}>) {
    try {
        const response: { message: string } = 
            yield call(dealService.cancelDeal.bind(dealService, action.payload.dealId));
        if (!response) return;
        
        yield put(cancelDealAction(action.payload.dealId));
        if (action.payload.callback) action.payload?.callback();
    } catch (e) {
        yield put({type: "CANCEL_DEAL_FAILED", message: e});
    }
}

function* watchCancelDeal() {
    yield takeEvery(DealEffectActions.CANCEL_DEAL, cancelDeal);
}

function* sendDeal(action: SagaEffectAction<{
    propertyId: string;
    callback?: () => void;
}>) {
    try {
        const response: { message: string, deal: DealModel } = 
            yield call(dealService.sendDeal.bind(dealService, action.payload.propertyId));
        if (!response) return;
        if (action.payload.callback) action.payload?.callback();
    } catch (e) {
        yield put({type: "SEND_DEAL_FAILED", message: e});
    }
}

function* watchSendDeal() {
    yield takeEvery(DealEffectActions.SEND_DEAL, sendDeal);
}

export default [
    watchRequestedByMeDeals(),
    watchRequestedForMeDeals(),
    watchMySuccessfulDeals(),
    watchSignDeal(),
    watchCancelDeal(),
    watchSendDeal()
];