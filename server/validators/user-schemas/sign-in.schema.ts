import { SignInDto } from "@/server/dto/user/sign-in.dto";
import { JSONSchemaType } from "ajv";

export const signInValidation: JSONSchemaType<SignInDto> = {
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
        }
    },
    required: [
        "email", 
        "password"
    ],
    errorMessage: {
        properties: {
            email: 'Incorrect email',
            password: 'Password must be within 6 and 50 symbols',
        }
    }
};