import { propertyService } from "@/common/services/property/property.service";
import { call, put, takeEvery } from "redux-saga/effects";
import { addPropertyAction, setPropertiesAction } from "../property/property.actions";
import { PropertyModel } from "@/common/services/property/property.model";
import { SagaEffectAction } from "../types/saga.types";
import { UserModel } from "@/common/services/user/user.model";
import { normalize, schema } from "normalizr";
import { StoreEntity } from "../types/store.types";
import { addUserAction } from "../user/user.actions";

export enum PropertyEffectActions {
    GET_LAST_OFFERS = 'GET_LAST_OFFERS',
    GET_ALL_OFFERS = 'GET_ALL_OFFERS',
    GET_PROPERTY = 'GET_PROPERTY',
}

function* fetchLastOffers() {
    try {
        const response: PropertyModel[] = 
            yield call(propertyService.getLastOffers.bind(propertyService));
        const propertySchema = new schema.Entity('properties', {}, { idAttribute: 'propertyId' });
        const normalizrData = normalize(response, [propertySchema]);
        const properties: StoreEntity<PropertyModel> = normalizrData?.entities?.properties!; 
        yield put(setPropertiesAction(properties));
    } catch (e) {
        yield put({type: "LAST_OFFERS_FETCH_FAILED", message: e});
    }
}

export function* watchLastOffers() {
    yield takeEvery(PropertyEffectActions.GET_LAST_OFFERS, fetchLastOffers);
}

function* fetchAllOffers() {
    try {
        const response: PropertyModel[] = 
            yield call(propertyService.getAllOffers.bind(propertyService));
        const propertySchema = new schema.Entity('properties', {}, { idAttribute: 'propertyId' });
        const normalizrData = normalize(response, [propertySchema]);
        const properties: StoreEntity<PropertyModel> = normalizrData?.entities?.properties!; 
        yield put(setPropertiesAction(properties));
    } catch (e) {
        yield put({type: "ALL_OFFERS_FETCH_FAILED", message: e});
    }
}

export function* watchAllOffers() {
    yield takeEvery(PropertyEffectActions.GET_ALL_OFFERS, fetchAllOffers);
}

function* fetchProperty(action: SagaEffectAction<{ propertyId: string }>) {
    try {
        const response: PropertyModel & { User: UserModel} = 
            yield call(propertyService.getPropertyById.bind(propertyService, action.payload.propertyId));
        const userSchema = new schema.Entity('users', {}, { idAttribute: 'userId' });
        const propertySchema = new schema.Entity(
            'properties', 
            { User: userSchema },
            { idAttribute: 'propertyId' }
        );
        const normalizrData = normalize(response, propertySchema);
        const property: PropertyModel = 
            normalizrData.entities?.properties?.[action.payload.propertyId];
        const user: UserModel = normalizrData.entities?.users?.[property.userId];
        yield put(addPropertyAction(property));
        yield put(addUserAction(user));
    } catch (e) {
        yield put({type: "PROPERTY_FETCH_FAILED", message: e});
    }
}

export function* watchProperty() {
    yield takeEvery(PropertyEffectActions.GET_PROPERTY, fetchProperty);
}