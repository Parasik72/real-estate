import Ajv, { AnySchema } from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { ValidationException } from "../exceptions/validation.exception";

export default function validate(schema: AnySchema) {
    const ajv = new Ajv({ allErrors: true });
    ajvErrors(ajv);
    addFormats(ajv);
    const validate = ajv.compile(schema);
    return async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
        const valid = validate(req.body);
        if (!valid) {
            const errorMsg = validate.errors?.map((error) => error.message)
                .join(', ') || 'Validation error';
            throw new ValidationException(errorMsg, 400);
        }
        return next();
    }
}