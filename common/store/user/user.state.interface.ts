import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";

export interface UserState {
    profile?: UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] }
}