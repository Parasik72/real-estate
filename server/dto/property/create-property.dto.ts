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
    propertyStatusId: string;
    propertyTypeId: string;
}