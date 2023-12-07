import { asFunction } from "awilix";
import User, { UserType } from './user';
import Property, { PropertyType } from './property';
import PropertyAddress, { PropertyAddressType } from './propertyaddress';
import PropertyImage, { PropertyImageType } from './propertyimage';
import Deal, { DealType } from './deal';

export interface IModelContainer {
    User: UserType;
    Property: PropertyType;
    PropertyAddress: PropertyAddressType;
    PropertyImage: PropertyImageType;
    Deal: DealType;
}

export default {
    User: asFunction(User).singleton(),
    Property: asFunction(Property).singleton(),
    PropertyAddress: asFunction(PropertyAddress).singleton(),
    PropertyImage: asFunction(PropertyImage).singleton(),
    Deal: asFunction(Deal).singleton(),
}