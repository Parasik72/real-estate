import { Property } from "@/db/models/property";
import { PropertyAddress } from "@/db/models/propertyaddress";
import { UUID } from "crypto";

export interface PropertiesPage {
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    properties: Property[];
}

export type PropertyWithAddress = Property & { PropertyAddress: PropertyAddress };

export interface UpdateProperty {
    bedRooms?: number;
    bathRooms?: number;
    area?: number;
    title?: string;
    description?: string;
    priceAmount?: number;
    propertyStatusId?: UUID;
    propertyTypeId?: UUID;
    updatedAt: BigInt;
}

export interface UpdatePropertyAddress {
    countryName?: string;
    cityName?: string;
    addressLine1?: string;
    addressLine2?: string | null;
}