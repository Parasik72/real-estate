import { PropertyModel } from "@/common/services/property/property.model";
import { StoreEntity } from "../types/store.types";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { IPagination } from "@/common/types/common.types";

export enum PropertyActions {
    SET_PROPERTIES = "SET_PROPERTIES",
    ADD_PROPERTY = "ADD_PROPERTY",
    SET_PROPERTY_IMAGES = 'SET_PROPERTY_IMAGES',
    ADD_PROPERTY_IMAGES = 'ADD_PROPERTY_IMAGES',
    ADD_PROPERTIES = 'ADD_PROPERTIES',
    SET_ALL_OFFERS_PAGE = 'SET_ALL_OFFERS_PAGE',
    SET_USER_PROPERTIES_PAGE = 'SET_USER_PROPERTIES_PAGE',
};
export interface SetPropertiesAction {
    type: PropertyActions.SET_PROPERTIES,
    payload: StoreEntity<PropertyModel>;
}

export interface AddPropertyAction {
    type: PropertyActions.ADD_PROPERTY,
    payload: PropertyModel;
}

export interface SetPropertyImagesAction {
    type: PropertyActions.SET_PROPERTY_IMAGES,
    payload: StoreEntity<PropertyImageModel>;
}

export interface AddPropertyImagesAction {
    type: PropertyActions.ADD_PROPERTY_IMAGES,
    payload: StoreEntity<PropertyImageModel>;
}

export interface AddPropertiesAction {
    type: PropertyActions.ADD_PROPERTIES,
    payload: StoreEntity<PropertyModel>;
}

export interface SetAllOffersPageAction {
    type: PropertyActions.SET_ALL_OFFERS_PAGE,
    payload: IPagination;
}

export interface SetUserPropertiesPageAction {
    type: PropertyActions.SET_USER_PROPERTIES_PAGE,
    payload: IPagination;
}

export type PropertyAction = SetPropertiesAction
                           | AddPropertyAction
                           | SetPropertyImagesAction
                           | AddPropertyImagesAction
                           | AddPropertiesAction
                           | SetAllOffersPageAction
                           | SetUserPropertiesPageAction;