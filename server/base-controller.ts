import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { INextApiRequestExtended } from "./types/http.types";
import { HttpException } from "./exceptions/http.exception";
import { apiErrorHandler } from "./handlers/api-error.handler";
import { notFoundHandler } from "./handlers/not-found.handler";
import 'reflect-metadata';

export class BaseController {
    public handler(routePath: string, expectedStatusCode: number = 200) {
        const router = createRouter<NextApiRequest, NextApiResponse>();
        const members = Reflect.getMetadata(routePath, this);
        Object.keys(members).forEach((method) => {
            for(let i = 0; i < members[method].length; ++i) {
                const methodName = method.toLowerCase();
                if (typeof router[methodName as keyof typeof router] === 'function') {
                    const callback = this[members[method][i]].bind(this);
                    const action = async (req: INextApiRequestExtended, res: NextApiResponse) => {
                        try {
                            const data = await callback({
                                body: req.body,
                                query: req.query,
                                user: req.user,
                                files: req.files
                            });
                            return res.status(expectedStatusCode).json(data);
                        } catch(error) {
                            if (error instanceof HttpException) {
                              return res.status(error.statusCode).json({ error: error.message });
                            }
                            return res.status(500).json({ error: `Server error: ${error}` });
                        }
                    }
                    router[methodName as keyof typeof router](routePath as any, action as any);
                }
            }
        });
        return router.handler({
            onError: apiErrorHandler,
            onNoMatch: notFoundHandler
        });
    }
}