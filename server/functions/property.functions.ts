import { Op, WhereOptions } from "sequelize";
import { GetAllPropertiesParams } from "../params/property.params";
import { IProperty, PropertyStatuses } from "../types/properties.types";

export const allOffersWhereOptions = 
(params: GetAllPropertiesParams): WhereOptions<IProperty> => ({
    ...(params.propertyTypeId && { propertyTypeId: params.propertyTypeId}),
    ...(params.bedsNum && { bedRooms: params.bedsNum}),
    ...(params.bathsNum && { bathRooms: params.bathsNum}),
    ...((params.minArea || params.maxArea) && { 
        priceAmount: { 
            ...(params.minArea && { [Op.gte]: params.minArea }),
            ...(params.maxArea && { [Op.lte]: params.maxArea }),
        }
    }),
    ...((params.minPrice || params.maxPrice) && { 
        priceAmount: { 
            ...(params.minPrice && { [Op.gte]: params.minPrice }),
            ...(params.maxPrice && { [Op.lte]: params.maxPrice }),
        }
    }),
    ...(params.keyword && { 
        [Op.or]: [
            { title: { [Op.regexp]: params.keyword } },
            { description: { [Op.regexp]: params.keyword } },
        ]
    }),
    propertyStatus: PropertyStatuses.ForSale
});

export const allOffersPAWhereOptions =
(params: GetAllPropertiesParams) => ({
    ...(params.country && { countryName: { [Op.regexp]: params.country }}),
    ...(params.city && { cityName: { [Op.regexp]: params.city }}),
    ...(params.addressLine1 && { addressLine1: { [Op.regexp]: params.addressLine1 }}),
    ...(params.addressLine2 && { addressLine2: { [Op.regexp]: params.addressLine2 }})
});