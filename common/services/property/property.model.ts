import { PropertyAddressModel } from "./property-address.model";
import { PropertyImageModel } from "./property-image.model";

export interface PropertyModel {
    propertyId: string,
    bedRooms: number,
    bathRooms: number,
    area: number,
    title: string,
    description: string,
    priceAmount: number,
    propertyStatus: string,
    userId: string,
    propertyAddressId: string,
    propertyType: string,
    createdAt: BigInt,
    updatedAt: BigInt,
    PropertyAddress?: PropertyAddressModel,
    PropertyImages?: PropertyImageModel[],
}
