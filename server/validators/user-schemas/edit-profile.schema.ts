import { nameRegExp, phoneRegExp } from "@/server/constants/reg-expretions.constants";
import { EditProfileDto } from "@/server/dto/user/edit-profile.dto";
import { JSONSchemaType } from "ajv";

export const editProfileValidation: JSONSchemaType<EditProfileDto> = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            nullable: true,
            minLength: 2,
            maxLength: 30,
            pattern: nameRegExp.source
        },
        lastName: {
            type: 'string',
            nullable: true,
            minLength: 2,
            maxLength: 30,
            pattern: nameRegExp.source
        },
        phone: {
            type: 'string',
            nullable: true,
            minLength: 9,
            maxLength: 12,
            pattern: phoneRegExp.source,
        }
    },
    anyOf: [
        { required: ['firstName'] },
        { required: ['lastName'] },
        { required: ['phone'] },
    ],
    errorMessage: {
        properties: {
            firstName: 'Firstname must be within 2 and 30 symbols and start with uppercase',
            lastName: 'Firstname must be within 2 and 30 symbols and start with uppercase',
            phone: 'Incorrect phone number'
        }
    }
};