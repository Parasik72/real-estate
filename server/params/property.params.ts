export type GetPropertyByIdParams = {
    propertyId: string;
}

export type GetAllPropertiesParams = {
    page?: string;
    limit?: string;
    propertyType?: string;
    keyword?: string;
    bedsNum?: string;
    bathsNum?: string;
    minArea?: string;
    maxArea?: string;
    country?: string;
    city?: string;
    addressLine1?: string;
    addressLine2?: string;
    minPrice?: string;
    maxPrice?: string;
}

export type UpdatePropertyParams = {
    propertyId: string;
}

export type GetUserProperties = {
    userId: string;
    page?: string;
    limit?: string;
}