import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";

export interface PropertyState {
    offers: (PropertyModel & {PropertyAddress: PropertyAddressModel})[];
    lastOffers: (PropertyModel & {PropertyAddress: PropertyAddressModel})[];
    property?: PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel};
}