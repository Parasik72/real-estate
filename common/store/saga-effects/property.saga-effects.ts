import { propertyService } from "@/common/services/property/property.service";
import { call, put, takeEvery } from "redux-saga/effects";
import { 
    addPropertiesAction, 
    addPropertyAction, 
    addPropertyImagesAction, 
    setAllOffersPageAction, 
    setPropertiesAction, 
    setPropertyImagesAction, 
    setUserPropertiesPageAction
} from "../property/property.actions";
import { PropertyModel } from "@/common/services/property/property.model";
import { SagaEffectAction } from "../types/saga.types";
import { UserModel } from "@/common/services/user/user.model";
import { normalize, schema } from "normalizr";
import { Entity } from "../types/store.types";
import { addUserAction } from "../user/user.actions";
import { AddPropertyDto } from "@/common/services/property/dto/add-property.dto";
import { EditPropertyDto } from "@/common/services/property/dto/edit-roperty.dto";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { GetAllOffersParams, PropertiesPageResponse } from "@/common/services/property/property-http.types";

export enum PropertyEffectActions {
    GET_LAST_OFFERS = 'GET_LAST_OFFERS',
    GET_ALL_OFFERS = 'GET_ALL_OFFERS',
    GET_PROPERTY = 'GET_PROPERTY',
    ADD_PROPERTY = 'ADD_PROPERTY',
    EDIT_PROPERTY = 'EDIT_PROPERTY',
    GET_USER_PROPERTIES = 'GET_USER_PROPERTIES'
}

// function* fetchLastOffers() {
//     try {
//         const response: PropertyModel[] = 
//             yield call(propertyService.getLastOffers.bind(propertyService));

//         const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
//         const propertySchema = new schema.Entity(
//             'properties', 
//             { PropertyImages: [propertyImageSchema] }, 
//             { idAttribute: 'propertyId' }
//         )
//         const normalizrData = normalize(response, [propertySchema]);
//         const properties: Entity<PropertyModel> = normalizrData?.entities?.properties || {}; 
//         const propertyImages: Entity<PropertyImageModel> = normalizrData?.entities?.propertyImages || {}; 
//         const propertiesIds = Object.keys(properties);
//         const propertyImagesIds = Object.keys(propertyImages);

//         yield put(setPropertiesAction({byId: properties, allIds: propertiesIds}));
//         yield put(setPropertyImagesAction({ byId: propertyImages, allIds: propertyImagesIds}));
//     } catch (e) {
//         yield put({type: "LAST_OFFERS_FETCH_FAILED", message: e});
//     }
// }

function* watchLastOffers() {
    yield takeEvery(PropertyEffectActions.GET_LAST_OFFERS, propertyService.getLastOffers);
}

function* fetchAllOffers(action: SagaEffectAction<GetAllOffersParams>) {
    try {
        const response: PropertiesPageResponse = 
            yield call(propertyService.getAllOffers.bind(propertyService, action.payload));

            const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
            const propertySchema = new schema.Entity(
                'properties', 
                { PropertyImages: [propertyImageSchema] }, 
                { idAttribute: 'propertyId' }
            );
            const normalizrData = normalize(response.properties, [propertySchema]);
            const properties: Entity<PropertyModel> = normalizrData?.entities?.properties || {}; 
            const propertyImages: Entity<PropertyImageModel> = normalizrData?.entities?.propertyImages || {}; 
            const propertiesIds = Object.keys(properties);
            const propertyImagesIds = Object.keys(propertyImages);
    
            if (action.payload?.page === 1) {
                yield put(setPropertiesAction({byId: properties, allIds: propertiesIds}));
                yield put(setPropertyImagesAction({ byId: propertyImages, allIds: propertyImagesIds}));
            } else {
                yield put(addPropertiesAction({byId: properties, allIds: propertiesIds}));
                yield put(addPropertyImagesAction({byId: propertyImages, allIds: propertyImagesIds}));
            }
            
            yield put(setAllOffersPageAction({
                limit: response.limit,
                offset: response.offset,
                page: response.page,
                totalPages: response.totalPages
            }));
    } catch (e) {
        yield put({type: "ALL_OFFERS_FETCH_FAILED", message: e});
    }
}

function* watchAllOffers() {
    yield takeEvery(PropertyEffectActions.GET_ALL_OFFERS, fetchAllOffers);
}

function* fetchUserProperties(action: SagaEffectAction<{
    userId: string,
    page?: number,
    limit?: number
}>) {
    try {
        const response: PropertiesPageResponse = 
            yield call(propertyService.getUserProperties.bind(
                propertyService, 
                action.payload.userId,
                action.payload.page,
                action.payload.limit,
            ));

            const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
            const propertySchema = new schema.Entity(
                'properties', 
                { PropertyImages: [propertyImageSchema] }, 
                { idAttribute: 'propertyId' }
            );
            const normalizrData = normalize(response.properties, [propertySchema]);
            const properties: Entity<PropertyModel> = normalizrData?.entities?.properties || {}; 
            const propertyImages: Entity<PropertyImageModel> = normalizrData?.entities?.propertyImages || {}; 
            const propertiesIds = Object.keys(properties);
            const propertyImagesIds = Object.keys(propertyImages);
    
            if (action.payload?.page === 1) {
                yield put(setPropertiesAction({byId: properties, allIds: propertiesIds}));
                yield put(setPropertyImagesAction({ byId: propertyImages, allIds: propertyImagesIds}));
            } else {
                yield put(addPropertiesAction({byId: properties, allIds: propertiesIds}));
                yield put(addPropertyImagesAction({byId: propertyImages, allIds: propertyImagesIds}));
            }
            
            yield put(setUserPropertiesPageAction({
                limit: response.limit,
                offset: response.offset,
                page: response.page,
                totalPages: response.totalPages
            }));
    } catch (e) {
        yield put({type: "USER_PROPERTIES_FETCH_FAILED", message: e});
    }
}

function* watchUserProperties() {
    yield takeEvery(PropertyEffectActions.GET_USER_PROPERTIES, fetchUserProperties);
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
        );

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
        const response: {property: PropertyModel} = 
            yield call(propertyService.addProperty.bind(propertyService, action.payload.values));
        if (!response) return;
        yield put(addPropertyAction(response.property));
        action.payload.callback(response.property.propertyId);
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
    propertyService.getLastOffers(),
    watchAllOffers(),
    watchProperty(),
    watchAddProperty(),
    watchEditProperty(),
    watchUserProperties()
];