import { UserType } from './User';
import { PropertyType } from './Property';
import { PropertyAddressType } from './PropertyAddress';
import { PropertyImageType } from './PropertyImage';
import { DealType } from './Deal';
import { ApiContainerKeys } from "@/server/contaier.keys";

export interface IModelContainer {
    [ApiContainerKeys.User]: UserType;
    [ApiContainerKeys.Property]: PropertyType;
    [ApiContainerKeys.PropertyAddress]: PropertyAddressType;
    [ApiContainerKeys.PropertyImage]: PropertyImageType;
    [ApiContainerKeys.Deal]: DealType;
}

// export default {
//     [ApiContainerKeys.User]: asFunction(User).singleton(),
//     [ApiContainerKeys.Property]: asFunction(Property).singleton(),
//     [ApiContainerKeys.PropertyAddress]: asFunction(PropertyAddress).singleton(),
//     [ApiContainerKeys.PropertyImage]: asFunction(PropertyImage).singleton(),
//     [ApiContainerKeys.Deal]: asFunction(Deal).singleton(),
// }