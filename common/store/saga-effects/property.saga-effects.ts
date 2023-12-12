import { propertyService } from "@/common/services/property/property.service";
import { call, put, takeEvery } from "redux-saga/effects";
import { addPropertyAction, setPropertiesAction, setPropertyImagesAction } from "../property/property.actions";
import { PropertyModel } from "@/common/services/property/property.model";
import { SagaEffectAction } from "../types/saga.types";
import { UserModel } from "@/common/services/user/user.model";
import { normalize, schema } from "normalizr";
import { Entity } from "../types/store.types";
import { addUserAction } from "../user/user.actions";
import { PropertySchema } from "../normalizr/property.schema";
import { AddPropertyDto } from "@/common/services/property/dto/add-property.dto";
import { EditPropertyDto } from "@/common/services/property/dto/edit-roperty.dto";
import { PropertyImageModel } from "@/common/services/property/property-image.model";

export enum PropertyEffectActions {
    GET_LAST_OFFERS = 'GET_LAST_OFFERS',
    GET_ALL_OFFERS = 'GET_ALL_OFFERS',
    GET_PROPERTY = 'GET_PROPERTY',
    ADD_PROPERTY = 'ADD_PROPERTY',
    EDIT_PROPERTY = 'EDIT_PROPERTY'
}

function* fetchLastOffers() {
    try {
        const response: PropertyModel[] = 
            yield call(propertyService.getLastOffers.bind(propertyService));

        const propertySchema = new PropertySchema();
        const normalizrData = normalize(response, propertySchema.getArraySchema());
        const properties: Entity<PropertyModel> = normalizrData?.entities?.properties!; 
        const propertiesIds = Object.keys(properties);

        yield put(setPropertiesAction({byId: properties, allIds: propertiesIds}));
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
        const properties: Entity<PropertyModel> = normalizrData?.entities?.properties!; 
        const propertiesIds = Object.keys(properties);

        yield put(setPropertiesAction({byId: properties, allIds: propertiesIds}));
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

        const userSchema = new schema.Entity('users', {}, { idAttribute: 'userId' });
        const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
        const propertySchema = new schema.Entity(
            'properties', 
            { User: userSchema, PropertyImages: [propertyImageSchema] }, 
            { idAttribute: 'propertyId' }
        )

        const normalizrData = normalize(response, propertySchema);
        const property: PropertyModel = 
            normalizrData.entities?.properties?.[action.payload.propertyId];
        const user: UserModel = normalizrData.entities?.users?.[property.userId];
        const propertyImages: Entity<PropertyImageModel> = normalizrData.entities?.propertyImages || {};
        const propertyImagesIds = Object.keys(propertyImages) || [];

        yield put(addPropertyAction(property));
        yield put(addUserAction(user));
        yield put(setPropertyImagesAction({ byId: propertyImages, allIds: propertyImagesIds}));
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
        yield put({type: "ADD_PROPERTY_FAILED", message: e});
    }
}

function* watchAddProperty() {
    yield takeEvery(PropertyEffectActions.ADD_PROPERTY, addProperty);
}

function* editProperty(action: SagaEffectAction<{
    values: EditPropertyDto,
    propertyId: string,
    callback: () => void;
}>) {
    try {
        const response: object = 
            yield call(propertyService.editProperty.bind(
                propertyService, 
                action.payload.values, 
                action.payload.propertyId
            ));
        if (!response) return;
        action.payload.callback();
    } catch (e) {
        yield put({type: "EDIT_PROPERTY_FAILED", message: e});
    }
}

function* watchEditProperty() {
    yield takeEvery(PropertyEffectActions.EDIT_PROPERTY, editProperty);
}

export default [
    watchLastOffers(),
    watchAllOffers(),
    watchProperty(),
    watchAddProperty(),
    watchEditProperty()
];