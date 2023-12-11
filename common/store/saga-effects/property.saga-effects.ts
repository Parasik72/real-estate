import { propertyService } from "@/common/services/property/property.service";
import { call, put, takeEvery } from "redux-saga/effects";
import { addPropertyAction, setPropertiesAction } from "../property/property.actions";
import { PropertyModel } from "@/common/services/property/property.model";
import { SagaEffectAction } from "../types/saga.types";
import { UserModel } from "@/common/services/user/user.model";
import { normalize } from "normalizr";
import { StoreEntity } from "../types/store.types";
import { addUserAction } from "../user/user.actions";
import { PropertySchema } from "../normalizr/property.schema";
import { UserSchema } from "../normalizr/user.schema";
import { AddPropertyDto } from "@/common/services/property/dto/add-property.dto";

export enum PropertyEffectActions {
    GET_LAST_OFFERS = 'GET_LAST_OFFERS',
    GET_ALL_OFFERS = 'GET_ALL_OFFERS',
    GET_PROPERTY = 'GET_PROPERTY',
    ADD_PROPERTY = 'ADD_PROPERTY'
}

function* fetchLastOffers() {
    try {
        const response: PropertyModel[] = 
            yield call(propertyService.getLastOffers.bind(propertyService));

        const propertySchema = new PropertySchema();
        const normalizrData = normalize(response, propertySchema.getArraySchema());
        const properties: StoreEntity<PropertyModel> = normalizrData?.entities?.properties!; 

        yield put(setPropertiesAction(properties));
    } catch (e) {
        yield put({type: "LAST_OFFERS_FETCH_FAILED", message: e});
    }
}

function* watchLastOffers() {
    yield takeEvery(PropertyEffectActions.GET_LAST_OFFERS, fetchLastOffers);
}

function* fetchAllOffers() {
    try {
        const response: PropertyModel[] = 
            yield call(propertyService.getAllOffers.bind(propertyService));

        const propertySchema = new PropertySchema();
        const normalizrData = normalize(response, propertySchema.getArraySchema());
        const properties: StoreEntity<PropertyModel> = normalizrData?.entities?.properties!; 

        yield put(setPropertiesAction(properties));
    } catch (e) {
        yield put({type: "ALL_OFFERS_FETCH_FAILED", message: e});
    }
}

function* watchAllOffers() {
    yield takeEvery(PropertyEffectActions.GET_ALL_OFFERS, fetchAllOffers);
}

function* fetchProperty(action: SagaEffectAction<{ propertyId: string }>) {
    try {
        const response: PropertyModel & { User: UserModel} = 
            yield call(propertyService.getPropertyById.bind(propertyService, action.payload.propertyId));

        const userSchema = new UserSchema();
        const propertySchema = new PropertySchema();
        const normalizrData = 
            normalize(response, propertySchema.getWithUserSchema(userSchema.getOneSchema()));
        const property: PropertyModel = 
            normalizrData.entities?.properties?.[action.payload.propertyId];
        const user: UserModel = normalizrData.entities?.users?.[property.userId];
        
        yield put(addPropertyAction(property));
        yield put(addUserAction(user));
    } catch (e) {
        yield put({type: "PROPERTY_FETCH_FAILED", message: e});
    }
}

function* watchProperty() {
    yield takeEvery(PropertyEffectActions.GET_PROPERTY, fetchProperty);
}

function* addProperty(action: SagaEffectAction<{
    values: AddPropertyDto,
    callback: (propertyId: string) => void;
}>) {
    try {
        const response: { propertyId: string } = 
            yield call(propertyService.addProperty.bind(propertyService, action.payload.values));
        if (!response) return;
        action.payload.callback(response.propertyId);
    } catch (e) {
        yield put({type: "PROPERTY_FETCH_FAILED", message: e});
    }
}

function* watchAddProperty() {
    yield takeEvery(PropertyEffectActions.ADD_PROPERTY, addProperty);
}

export default [
    watchLastOffers(),
    watchAllOffers(),
    watchProperty(),
    watchAddProperty()
];