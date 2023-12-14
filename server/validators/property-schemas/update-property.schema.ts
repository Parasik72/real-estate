import { imageValidationExp, minimumZeroExp, moreThanZeroExp } from "@/server/constants/reg-expretions.constants";
import { PropertyStatuses, PropertyTypes } from "@/server/types/properties.types";
import { JSONSchemaType } from "ajv";

const propertyStatusEnum = [PropertyStatuses.Awaiting, PropertyStatuses.ForSale];
const propertyTypeEnum = [PropertyTypes.Apartment, PropertyTypes.House, PropertyTypes.Villa];

export const updatePropertyValidation: JSONSchemaType<{
    bedRooms?: string;
    bathRooms?: string;
    area?: string;
    title?: string;
    description?: string;
    priceAmount?: string;
    countryName?: string;
    cityName?: string;
    addressLine1?: string;
    addressLine2?: string | null;
    propertyStatus?: string;
    propertyType?: string;
    imgsToDeleteIds?: string[];
    files?: object[];
}> = {
    type: 'object',
    properties: {
        propertyStatus: {
            type: 'string',
            nullable: true,
            enum: propertyStatusEnum
        },
        propertyType: {
            type: 'string',
            nullable: true,
            enum: propertyTypeEnum
        },
        title: {
            type: 'string',
            minLength: 5,
            maxLength: 100,
            nullable: true
        },
        description: {
            type: 'string',
            minLength: 5,
            maxLength: 1000,
            nullable: true
        },
        countryName: {
            type: 'string',
            minLength: 2,
            maxLength: 30,
            nullable: true
        },
        cityName: {
            type: 'string',
            minLength: 2,
            maxLength: 30,
            nullable: true
        },
        addressLine1: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            nullable: true
        },
        addressLine2: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            nullable: true
        },
        area: {
            type: 'string',
            nullable: true,
            pattern: moreThanZeroExp.source
        },
        bathRooms: {
            type: 'string',
            nullable: true,
            pattern: minimumZeroExp.source
        },
        bedRooms: {
            type: 'string',
            nullable: true,
            pattern: minimumZeroExp.source
        },
        priceAmount: {
            type: 'string',
            nullable: true,
            pattern: moreThanZeroExp.source
        },
        imgsToDeleteIds: {
            type: 'array',
            nullable: true,
            minItems: 0,
            items: {
                type: 'string'
            }
        },
        files: {
            type: 'array',
            nullable: true,
            minItems: 0,
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
    anyOf: [
        { required: ['propertyStatus'] },
        { required: ['propertyType'] },
        { required: ['title'] },
        { required: ['description'] },
        { required: ['countryName'] },
        { required: ['cityName'] },
        { required: ['addressLine1'] },
        { required: ['addressLine2'] },
        { required: ['area'] },
        { required: ['bathRooms'] },
        { required: ['bedRooms'] },
        { required: ['priceAmount'] },
        { required: ['imgsToDeleteIds'] },
        { required: ['files'] },
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
            imgsToDeleteIds: 'imgsToDeleteIds must consist of more than 0 items',
            files: 'images must consist of more than 0 items and be an image type'
        }
    }
};