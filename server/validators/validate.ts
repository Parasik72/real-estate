import Ajv, { AnySchema } from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { ValidationException } from "../exceptions/validation.exception";
import { INextApiRequestExtended } from "../types/http.types";

export default function validate(schema: AnySchema) {
    const ajv = new Ajv({ allErrors: true });
    ajvErrors(ajv);
    addFormats(ajv as any);
    const validate = ajv.compile(schema);
    return async (req: INextApiRequestExtended, res: NextApiResponse, next: NextHandler) => {
        try {
            const valid = validate({...req.body, files: req.files });
            if (!valid) {
                const errorMsg = validate.errors?.map((error) => error.message)
                    .join('; ') || 'Validation error';
                throw new ValidationException(errorMsg, 400);
            }
            return next();
        } catch (error) {
            if (error instanceof ValidationException) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: `Validation error: ${error}` })
        }
    }
}