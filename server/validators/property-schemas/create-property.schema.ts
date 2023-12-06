import { JSONSchemaType } from "ajv";

const moreThanZero = /^[1-9][0-9]*$/
const minimumZero = /^[0-9]*$/
const imageValidation = /image\//

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
    propertyStatusId: string;
    propertyTypeId: string;
    files: object[];
}> = {
    type: 'object',
    properties: {
        propertyStatusId: {
            type: 'string'
        },
        propertyTypeId: {
            type: 'string'
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
            pattern: moreThanZero.source
        },
        bathRooms: {
            type: 'string',
            pattern: minimumZero.source
        },
        bedRooms: {
            type: 'string',
            pattern: minimumZero.source
        },
        priceAmount: {
            type: 'string',
            pattern: moreThanZero.source
        },
        files: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                properties: {
                    mimetype: {
                        type: 'string',
                        pattern: imageValidation.source
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
        "propertyStatusId",
        "propertyTypeId",
        "title",
        "files"
    ],
    errorMessage: {
        properties: {
            propertyStatusId: 'propertyStatusId must be a string',
            propertyTypeId: 'propertyStatusId must be a string',
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