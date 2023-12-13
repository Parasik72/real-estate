import { PropertyModel } from "@/common/services/property/property.model";
import { 
    AddPropertiesAction,
    AddPropertyAction,
    AddPropertyImagesAction,
    PropertyActions, 
    SetPropertiesAction,
    SetPropertyImagesAction, 
} from "./property.action.interface";
import { StoreEntity } from "../types/store.types";
import { PropertyImageModel } from "@/common/services/property/property-image.model";

export const setPropertiesAction = (payload: StoreEntity<PropertyModel>): SetPropertiesAction => 
    ({ type: PropertyActions.SET_PROPERTIES, payload });

export const addPropertyAction = (payload: PropertyModel): AddPropertyAction => 
    ({ type: PropertyActions.ADD_PROPERTY, payload });

export const setPropertyImagesAction = (payload: StoreEntity<PropertyImageModel>): SetPropertyImagesAction => 
    ({ type: PropertyActions.SET_PROPERTY_IMAGES, payload });

export const addPropertyImagesAction = (payload: StoreEntity<PropertyImageModel>): AddPropertyImagesAction => 
    ({ type: PropertyActions.ADD_PROPERTY_IMAGES, payload });

export const addPropertiesAction = (payload: StoreEntity<PropertyModel>): AddPropertiesAction => 
    ({ type: PropertyActions.ADD_PROPERTIES, payload });