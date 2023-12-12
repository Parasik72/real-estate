import { PropertyStatuses, PropertyTypes } from "@/common/types/property.type";

export interface EditPropertyDto {
    bedRooms?: number;
    bathRooms?: number;
    area?: number;
    title?: string;
    description?: string;
    priceAmount?: number;
    countryName?: string;
    cityName?: string;
    addressLine1?: string;
    addressLine2?: string | null;
    propertyStatus?: PropertyStatuses;
    propertyType?: PropertyTypes;
    images?: FileList;
    imgsToDeleteIds?: string[];
}