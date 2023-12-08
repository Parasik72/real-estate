import { PropertyModel } from "@/common/services/property/property.model";
import { StoreEntity } from "../types/store.types";

export enum PropertyActions {
    SET_PROPERTIES = "SET_PROPERTIES",
    ADD_PROPERTY = "ADD_PROPERTY"
};
export interface SetPropertiesAction {
    type: PropertyActions.SET_PROPERTIES,
    payload: StoreEntity<PropertyModel>;
}

export interface AddPropertyAction {
    type: PropertyActions.ADD_PROPERTY,
    payload: PropertyModel;
}

export type PropertyAction = SetPropertiesAction
                           | AddPropertyAction;