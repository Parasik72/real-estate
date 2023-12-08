import { PropertyModel } from "@/common/services/property/property.model";
import { 
    AddPropertyAction,
    PropertyActions, 
    SetPropertiesAction, 
} from "./property.action.interface";
import { StoreEntity } from "../types/store.types";

export const setPropertiesAction = (payload: StoreEntity<PropertyModel>): SetPropertiesAction => 
    ({ type: PropertyActions.SET_PROPERTIES, payload });

export const addPropertyAction = (payload: PropertyModel): AddPropertyAction => 
    ({ type: PropertyActions.ADD_PROPERTY, payload });