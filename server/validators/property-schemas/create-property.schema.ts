import { imageValidationExp, minimumZeroExp, moreThanZeroExp } from "@/server/constants/reg-expretions.constants";
import { PropertyStatuses, PropertyTypes } from "@/server/types/properties.types";
import { JSONSchemaType } from "ajv";

const propertyStatusEnum = [PropertyStatuses.Awaiting, PropertyStatuses.ForSale];
const propertyTypeEnum = [PropertyTypes.Apartment, PropertyTypes.House, PropertyTypes.Villa];

export const createPropertyValidation
: JSONSchemaType<{
    bedRooms: string;
    bathRooms: string;
    area: string;
    title: string;
    description: string;
    priceAmount: string;
    countryName: string;
    cityName: string;
    addressLine1: string;
    addressLine2: string | null;
    propertyStatus: string;
    propertyType: string;
    files: object[];
}> = {
    type: 'object',
    properties: {
        propertyStatus: {
            type: 'string',
            enum: propertyStatusEnum
        },
        propertyType: {
            type: 'string',
            enum: propertyTypeEnum
        },
        title: {
            type: 'string',
            minLength: 5,
            maxLength: 100
        },
        description: {
            type: 'string',
            minLength: 5,
            maxLength: 1000
        },
        countryName: {
            type: 'string',
            minLength: 2,
            maxLength: 30
        },
        cityName: {
            type: 'string',
            minLength: 2,
            maxLength: 30
        },
        addressLine1: {
            type: 'string',
            minLength: 2,
            maxLength: 50
        },
        addressLine2: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            nullable: true
        },
        area: {
            type: 'string',
            pattern: moreThanZeroExp.source
        },
        bathRooms: {
            type: 'string',
            pattern: minimumZeroExp.source
        },
        bedRooms: {
            type: 'string',
            pattern: minimumZeroExp.source
        },
        priceAmount: {
            type: 'string',
            pattern: moreThanZeroExp.source
        },
        files: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                properties: {
                    mimetype: {
                        type: 'string',
                        pattern: imageValidationExp.source
                    }
                }
            }
        }
    },
    required: [
        "addressLine1",
        "addressLine2",
        "area",
        "bathRooms",
        "bedRooms",
        "cityName",
        "countryName",
        "description",
        "priceAmount",
        "propertyStatus",
        "propertyType",
        "title",
        "files"
    ],
    errorMessage: {
        properties: {
            propertyStatus: `propertyStatus must equal to ${propertyStatusEnum}`,
            propertyType: `propertyStatus must equal to ${propertyTypeEnum}`,
            title: 'title must be within 5 and 100 symbols',
            description: 'description must be within 5 and 1000 symbols',
            countryName: 'countryName must be within 2 and 30 symbols',
            cityName: 'cityName must be within 2 and 30 symbols',
            addressLine1: 'addressLine1 must be within 2 and 50 symbols',
            addressLine2: 'addressLine2 must be within 2 and 50 symbols or null',
            area: 'area must be more than 0',
            bathRooms: 'bathRooms must be minimum 0',
            bedRooms: 'bedRooms must be minimum 0',
            priceAmount: 'priceAmount must be more than 0',
            files: 'images must consist of more than 0 items and be an image type'
        }
    }
};