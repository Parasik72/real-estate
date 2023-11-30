export interface GetPropertyResponse {
    propertyId: string,
    bedRooms: number,
    bathRooms: number,
    area: number,
    title: string,
    description: string,
    priceAmount: number,
    propertyStatusId: string,
    userId: string,
    propertyAddressId: string,
    propertyTypeId: string,
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