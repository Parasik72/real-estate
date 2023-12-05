import { SignUpDto } from "@/server/dto/user/sign-up.dto";
import { JSONSchemaType } from "ajv";

const phoneRegExp = '/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/';
const nameRegExp = '/^[A-Z][a-z]*$/';

export const signUpValidSchema: JSONSchemaType<SignUpDto> = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
            minLength: 6,
            maxLength: 50
        },
        firstName: {
            type: 'string',
            minLength: 2,
            maxLength: 30,
            pattern: nameRegExp
        },
        lastName: {
            type: 'string',
            minLength: 2,
            maxLength: 30,
            pattern: nameRegExp
        },
        phone: {
            type: 'string',
            minLength: 9,
            maxLength: 12,
            pattern: phoneRegExp
        }
    },
    required: [
        "email", 
        "firstName", 
        "lastName", 
        "password", 
        "phone"
    ]
};