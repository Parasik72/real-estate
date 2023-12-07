import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { PropertyActions, SetLastOffersAction, SetOffersAction, SetPropertyAction } from "./property.action.interface";
import { UserModel } from "@/common/services/user/user.model";

export const setOffersAction = (
    payload: (PropertyModel & {PropertyAddress: PropertyAddressModel})[]
): SetOffersAction => ({ type: PropertyActions.SET_OFFERS, payload });

export const setLastOffersAction = (
    payload: (PropertyModel & {PropertyAddress: PropertyAddressModel})[]
): SetLastOffersAction => ({ type: PropertyActions.SET_LAST_OFFERS, payload });

export const setPropertyAction = (
    payload: PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel}
): SetPropertyAction => ({ type: PropertyActions.SET_PROPERTY, payload });