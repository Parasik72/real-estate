import { IPagination } from "@/common/types/common.types";
import { PropertyAddressModel } from "./property-address.model";
import { PropertyModel } from "./property.model";

export interface GetPropertyResponse {
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
    updatedAt: BigInt
}

export interface PropertiesPageResponse extends IPagination {
    properties: (PropertyModel & { PropertyAddress: PropertyAddressModel; })[];
}