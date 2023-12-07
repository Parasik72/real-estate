import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";

export enum UserActions {
    SET_PROFILE = 'SET_PROFILE'
};

export interface SetProfileAction {
    type: UserActions.SET_PROFILE;
    payload: UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] };
}

export type UserAction = SetProfileAction;