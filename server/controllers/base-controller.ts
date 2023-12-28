import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { INextApiRequestExtended, INextPageContextExtended } from "../types/http.types";
import { HttpException } from "../exceptions/http.exception";
import { apiErrorHandler } from "../handlers/api-error.handler";
import { notFoundHandler } from "../handlers/not-found.handler";
import { ControllerConfig, IPage, MiddlewareType, MiddlewareTypeSSR } from "../types/controller.types";
import BaseContext from "../context/base-context";
import { Model } from "sequelize";
import { IPager } from "../types/controller.types";
import 'reflect-metadata';

const getClassMembers = (constructor: Function) => {
    return Reflect.getMetadata(constructor.name, constructor);
}

const getMethodMembers = (constructor: Function, classMethodName: string) => {
    return Reflect.getMetadata(constructor.name + '_' + classMethodName, constructor);
}

const getMiddlewares = (
    constructor: Function, 
    classMethodName: string
) => {
    let middlewares: MiddlewareType[] = [];
    const classMembers = getClassMembers(constructor);
    const methodMembers = getMethodMembers(constructor, classMethodName);
    middlewares = !classMembers || !classMembers.USE 
        ? [] 
        : classMembers.USE;
    middlewares = !methodMembers || !methodMembers.USE 
        ? middlewares 
        : [...middlewares, ...methodMembers.USE];
    return middlewares;
}

const getMessage = (
    constructor: Function, 
    classMethodName: string
) => {
    const methodMembers = getMethodMembers(constructor, classMethodName);
    return methodMembers?.msg ? methodMembers.msg : undefined;
}

const getIsPager = (
    constructor: Function, 
    classMethodName: string
) => {
    const methodMembers = getMethodMembers(constructor, classMethodName);
    return methodMembers?.isPager;
}

interface IResponseData {
    entities?: Model[];
    pager?: IPage;
    message?: string;
}

const concatArrays = (newData: any[] = [], responseArr: any[] = []) => {
    return [ ...responseArr, ...newData ];
}

const generateResponseData = (data: object, isPager?: boolean, msg?: string) => {
    let response: IResponseData = {};
    if(data && isPager) {
        const pager = data as IPager<any>;
        response = {
            entities: concatArrays(
                pager[pager.pager.paginationName] as any, 
                (data as any).entities as any
            ),
            pager: pager.pager
        }
    } else if (data) {
        response = {
            entities: Array.isArray(data) ? data : [data]
        }
    }
    if (msg) response.message = msg;
    return response;
}

const apiAction = (callback: any, statusCode: number, isPager?: boolean, msg?: string) => (
    async (req: INextApiRequestExtended, res: NextApiResponse) => {
        try {
            const data: any | undefined = await callback({
                body: req.body,
                query: req.query,
                user: req.user,
                files: req.files,
                req, 
                res
            } as ControllerConfig);
            const result = generateResponseData(data, isPager, msg);
            return res.status(statusCode).json(result);
        } catch(error) {
            if (error instanceof HttpException) {
              return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ error: `Server error: ${error}` });
        }
    }
);

export class BaseController extends BaseContext {
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
                    const action = apiAction(
                        callback, 
                        expectedStatusCode, 
                        getIsPager(this.constructor, members[method][i]), 
                        getMessage(this.constructor, members[method][i])
                    );
                    router[methodName as keyof typeof router](routePath as any, action as any);
                }
            }
        });
        return router.handler({
            onError: apiErrorHandler,
            onNoMatch: notFoundHandler
        });
    }

    public handlerSSR(context: INextPageContextExtended) {
        try {
            const router = createRouter();
            const routePath = context.routePath || context.req.url;
            const method = 'SSR';
            const members = Reflect.getMetadata(routePath, this);
            const [firstMethod] = members[method];
            getMiddlewares(this.constructor, firstMethod)
                .forEach((middleware) => router.use(middleware as MiddlewareTypeSSR));
            const callback = (this as any)[firstMethod].bind(this);
            return router.get(async (req: any, res) => {
                const data = await callback({
                    body: {},
                    query: context.query || {},
                    user: req.user,
                    req,
                    res
                } as ControllerConfig);
                const result = generateResponseData(data, getIsPager(this.constructor, firstMethod));
                return { props: { data: JSON.parse(JSON.stringify(result)) } };
            }).run(context.req, context.res);
        } catch (error) {
            return { 
                props: { message: error }, 
                notFound: error instanceof HttpException && error.statusCode === 404
            };
        }
    }
}