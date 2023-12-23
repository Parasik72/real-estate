import { asFunction } from "awilix";
import User, { UserType } from './user';
import Property, { PropertyType } from './property';
import PropertyAddress, { PropertyAddressType } from './propertyaddress';
import PropertyImage, { PropertyImageType } from './propertyimage';
import Deal, { DealType } from './deal';
import { ApiContainerKeys } from "@/server/contaier.keys";

export interface IModelContainer {
    [ApiContainerKeys.User]: UserType;
    [ApiContainerKeys.Property]: PropertyType;
    [ApiContainerKeys.PropertyAddress]: PropertyAddressType;
    [ApiContainerKeys.PropertyImage]: PropertyImageType;
    [ApiContainerKeys.Deal]: DealType;
}

export default {
    [ApiContainerKeys.User]: asFunction(User).singleton(),
    [ApiContainerKeys.Property]: asFunction(Property).singleton(),
    [ApiContainerKeys.PropertyAddress]: asFunction(PropertyAddress).singleton(),
    [ApiContainerKeys.PropertyImage]: asFunction(PropertyImage).singleton(),
    [ApiContainerKeys.Deal]: asFunction(Deal).singleton(),
}