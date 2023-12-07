import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";
import { SetProfileAction, UserActions } from "./user.action.interface";

export const setProfileAction = (
    payload: UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] }
): SetProfileAction => ({ type: UserActions.SET_PROFILE, payload });