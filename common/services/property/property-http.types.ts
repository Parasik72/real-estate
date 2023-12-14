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

export type GetAllOffersParams = {
    page?: number;
    limit?: number;
    propertyType?: string;
    keyword?: string;
    bedsNum?: number;
    bathsNum?: number;
    minArea?: number;
    maxArea?: number;
    country?: string;
    city?: string;
    addressLine1?: string;
    addressLine2?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface PropertiesPageResponse extends IPagination {
    properties: (PropertyModel & { PropertyAddress: PropertyAddressModel; })[];
}