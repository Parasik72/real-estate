import { PropertyStatuses, PropertyTypes } from "@/server/types/properties.types";

export interface CreatePropertyDto {
    bedRooms: number;
    bathRooms: number;
    area: number;
    title: string;
    description: string;
    priceAmount: number;
    countryName: string;
    cityName: string;
    addressLine1: string;
    addressLine2: string | null;
    propertyStatus: PropertyStatuses;
    propertyType: PropertyTypes;
}