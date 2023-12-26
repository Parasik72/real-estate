import { minimumZeroExp, moreThanZeroExp } from "@/server/constants/reg-expretions.constants";
import { PropertyTypes } from "@/server/types/properties.types";
import { JSONSchemaType } from "ajv";

const propertyTypeEnum = [PropertyTypes.Apartment, PropertyTypes.House, PropertyTypes.Villa, 'Any'];

export const allOffersValidation
: JSONSchemaType<{
    page?: string;
    limit?: string;
    propertyType?: string;
    bedsNum?: string;
    bathsNum?: string;
    minArea?: string;
    maxArea?: string;
    minPrice?: string;
    maxPrice?: string;
}> = {
    type: 'object',
    properties: {
        page: {
            type: 'string',
            nullable: true,
            pattern: moreThanZeroExp.source
        },
        limit: {
            type: 'string',
            nullable: true,
            pattern: moreThanZeroExp.source
        },
        propertyType: {
            type: 'string',
            nullable: true,
            enum: propertyTypeEnum
        },
        bedsNum: {
            type: 'string',
            nullable: true,
            pattern: minimumZeroExp.source
        },
        bathsNum: {
            type: 'string',
            nullable: true,
            pattern: minimumZeroExp.source
        },
        minArea: {
            type: 'string',
            nullable: true,
            pattern: moreThanZeroExp.source
        },
        maxArea: {
            type: 'string',
            nullable: true,
            pattern: moreThanZeroExp.source
        },
        minPrice: {
            type: 'string',
            nullable: true,
            pattern: moreThanZeroExp.source
        },
        maxPrice: {
            type: 'string',
            nullable: true,
            pattern: moreThanZeroExp.source
        }
    },
    errorMessage: {
        properties: {
            propertyType: `propertyStatus must equal to ${propertyTypeEnum}`,
            page: 'page must be more than 0',
            limit: 'limit must be more than 0',
            minArea: 'minArea must be more than 0',
            maxArea: 'maxArea must be more than 0',
            minPrice: 'minPrice must be more than 0',
            maxPrice: 'maxPrice must be more than 0',
            bedsNum: 'bedsNum must be minimum 0',
            bathsNum: 'bathsNum must be minimum 0',
        }
    }
};