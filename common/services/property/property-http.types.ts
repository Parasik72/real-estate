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

export interface PropertiesPageResponse {
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    properties: GetPropertyResponse[];
}