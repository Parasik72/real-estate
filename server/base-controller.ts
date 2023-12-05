import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { INextApiRequestExtended, INextPageContextExtended } from "./types/http.types";
import { HttpException } from "./exceptions/http.exception";
import { apiErrorHandler } from "./handlers/api-error.handler";
import { notFoundHandler } from "./handlers/not-found.handler";
import { ControllerConfig, MiddlewareType, MiddlewareTypeSSR } from "./types/controller.types";
import 'reflect-metadata';

export class BaseController {
    public handler(
        routePath: string,
        middlewares: MiddlewareType[] = [],
        expectedStatusCode: number = 200
    ) {
        const router = createRouter<NextApiRequest, NextApiResponse>();
        middlewares.forEach((middleware) => router.use(middleware));
        const members = Reflect.getMetadata(routePath, this);
        Object.keys(members).forEach((method) => {
            for(let i = 0; i < members[method].length; ++i) {
                const methodName = method.toLowerCase();
                if (typeof router[methodName as keyof typeof router] === 'function') {
                    const callback = (this as any)[members[method][i]].bind(this);
                    const action = async (req: INextApiRequestExtended, res: NextApiResponse) => {
                        try {
                            const data = await callback({
                                body: req.body,
                                query: req.query,
                                user: req.user,
                                files: req.files,
                                req, 
                                res
                            } as ControllerConfig);
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

    public handlerSSR(
        context: INextPageContextExtended,
        middlewares: MiddlewareTypeSSR[] = []
    ) {
        const router = createRouter();
        middlewares.forEach((middleware) => router.use(middleware));
        return router.get(async (req, res) => {
            try {
                const routePath = context.routePath || context.req.url;
                const method = 'SSR';
                const members = Reflect.getMetadata(routePath, this);
                const [firstMethod] = members[method];
                const callback = (this as any)[firstMethod].bind(this);
                const data = await callback({
                    body: {},
                    query: context.query,
                    user: context.user,
                    req: context.req,
                    res: context.res
                } as ControllerConfig);
                return {
                    props: { data: JSON.parse(JSON.stringify(data)) }
                };
            } catch (error) {
                return { 
                    props: { message: error }, 
                    notFound: error instanceof HttpException && error.statusCode === 404
                };
            }
        }).run(context.req, context.res);
    }
}