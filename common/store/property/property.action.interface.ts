import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";

export enum PropertyActions {
    SET_OFFERS = "SET_OFFERS",
    SET_LAST_OFFERS = "SET_LAST_OFFERS",
    SET_PROPERTY = "SET_PROPERTY",
};

export interface SetOffersAction {
    type: PropertyActions.SET_OFFERS,
    payload: (PropertyModel & {PropertyAddress: PropertyAddressModel})[];
}

export interface SetLastOffersAction {
    type: PropertyActions.SET_LAST_OFFERS,
    payload: (PropertyModel & {PropertyAddress: PropertyAddressModel})[];
}

export interface SetPropertyAction {
    type: PropertyActions.SET_PROPERTY,
    payload: PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel};
}

export type PropertyAction = SetOffersAction 
                           | SetLastOffersAction
                           | SetPropertyAction;