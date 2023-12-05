import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { INextApiRequestExtended, INextPageContextExtended } from "./types/http.types";
import { HttpException } from "./exceptions/http.exception";
import { apiErrorHandler } from "./handlers/api-error.handler";
import { notFoundHandler } from "./handlers/not-found.handler";
import { ControllerConfig, MiddlewareType } from "./types/controller.types";
import 'reflect-metadata';

const getMiddlewares = (
    constructor: Function, 
    classMethodName: string
) => {
    let middlewares: MiddlewareType[] = [];
    const classMembers = Reflect.getMetadata(constructor.name, constructor);
    const methodMembers = Reflect.getMetadata(constructor.name + '_' + classMethodName, constructor);
    middlewares = !classMembers || !classMembers.USE 
        ? [] 
        : classMembers.USE;
    middlewares = !methodMembers || !methodMembers.USE 
        ? middlewares 
        : [...middlewares, ...methodMembers.USE];
    return middlewares;
}

const apiAction = (callback: any, statusCode: number) => (
    async (req: INextApiRequestExtended, res: NextApiResponse) => {
        try {
            const data = await callback({
                body: req.body,
                query: req.query,
                user: req.user,
                files: req.files,
                req, 
                res
            } as ControllerConfig);
            return res.status(statusCode).json(data);
        } catch(error) {
            if (error instanceof HttpException) {
              return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: `Server error: ${error}` });
        }
    }
);

export class BaseController {
    public handler(
        routePath: string,
        expectedStatusCode: number = 200
    ) {
        const router = createRouter<NextApiRequest, NextApiResponse>();
        const members = Reflect.getMetadata(routePath, this);
        Object.keys(members).forEach((method) => {
            for(let i = 0; i < members[method].length; ++i) {
                const methodName = method.toLowerCase();
                if (typeof router[methodName as keyof typeof router] === 'function') {
                    getMiddlewares(this.constructor, members[method][i])
                        .forEach((middleware) => router.use(middleware));
                    const callback = (this as any)[members[method][i]].bind(this);
                    const action = apiAction(callback, expectedStatusCode)
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
        context: INextPageContextExtended
    ) {
        const router = createRouter();
        return router.get(async (req, res) => {
            try {
                const routePath = context.routePath || context.req.url;
                const method = 'SSR';
                const members = Reflect.getMetadata(routePath, this);
                const [firstMethod] = members[method];
                getMiddlewares(this.constructor, firstMethod)
                        .forEach((middleware) => router.use(middleware));
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