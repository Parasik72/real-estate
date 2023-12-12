import { PropertyModel } from "@/common/services/property/property.model";
import { StoreEntity } from "../types/store.types";
import { PropertyImageModel } from "@/common/services/property/property-image.model";

export enum PropertyActions {
    SET_PROPERTIES = "SET_PROPERTIES",
    ADD_PROPERTY = "ADD_PROPERTY",
    SET_PROPERTY_IMAGES = 'SET_PROPERTY_IMAGES'
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

export type PropertyAction = SetPropertiesAction
                           | AddPropertyAction
                           | SetPropertyImagesAction;