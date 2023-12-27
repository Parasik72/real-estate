import { Schema, normalize, schema } from "normalizr";
import { call, fork, put, take } from "redux-saga/effects";
import { ReducerMethods } from "../store/reducer.methods";
import BaseContext from "../context/base-context";
import IContextContainer from "../context/icontext-container";
import { sagaAction } from "../functions/saga.functions";
import { SagaEffectAction } from "../store/types/saga.types";
import { ToastifyAction, ToastifyStatus } from "../store/toastify/toastify.types";
import { entitiesReducer } from "../store/entities/entities.reducer";
import { IReducer } from "../decorators/reducer.decorator";
import 'reflect-metadata';
import { PagerReducer } from "../decorators/pager.decorator";
import { paginationsReducer } from "../store/paginations/paginations.reducer";

export interface HttpRequestConfig<ReqBody extends Object> {
    url: string;
    body?: ReqBody;
}

export interface ISagaMethod {
    className: string;
    methodName: string;
}

export enum ToastifyEffectActions {
    ADD_TOASTIFY = 'toastifies_addToastify',
}

export interface InitSchemaOpts {
    name: string,
    definitions: Schema,
    options: schema.EntityOptions,
}

interface IAction {
    type: string; 
    payload: Object;
}

const MESSAGE = 'message';
const PAGER = 'pager';
const ENTITIES = 'entities';

export class BaseService extends BaseContext {
    private _schema: schema.Entity[] = [];
    private _entityName: string = '';
    private _actions: { [key: string]: Object } = {};

    constructor(ctx: IContextContainer) {
        super(ctx);
    }

    public static sagas(di: IContextContainer) {
        const objects: ISagaMethod[] = Reflect.getMetadata('sagas', BaseService) || [];
        return objects.map(obj => {
            const classInstance = di[obj.className as keyof typeof di] as BaseService;
            const actionName = classInstance.entityName + '_' + obj.methodName;
            const method = (classInstance[obj.methodName as keyof typeof classInstance] as any).bind(classInstance);
            classInstance._actions[obj.methodName] = (data?: any) =>
                sagaAction(actionName, data);
            const saga = function* () {
                while (true) {
                    const data: SagaEffectAction<Object> = yield take(actionName);
                    yield call(method, data.payload);
                }
            };
            return fork(saga);
        });
    }

    public static reducers(di: IContextContainer) {
        const entities: IReducer[] = Reflect.getMetadata('entities', BaseService) || [];
        const entityReducers = entities.reduce((result, reducerOpts) => {
            if (reducerOpts.initSchema) {
                const classInstance = di[reducerOpts.className as keyof typeof di] as BaseService;
                classInstance.initSchema({ ...reducerOpts.initSchema, name: reducerOpts.entityName });
            }
            const getReducer = () => {
                if (reducerOpts.reducerFunc) return reducerOpts.reducerFunc;
                return (state: any, action: any) => entitiesReducer(state, action, reducerOpts.entityName);
            } 
            result[reducerOpts.entityName] = getReducer();
            return result;
        }, {} as any);
        const pagers: PagerReducer[] = Reflect.getMetadata('pagers', BaseService) || [];
        const pagerReducers = pagers.reduce((result, pagerOpts) => {
            result[pagerOpts.pagerName] = 
                (state: any, action: any) => paginationsReducer(state, action, pagerOpts.pagerName);
            return result;
        }, entityReducers);
        return pagerReducers;
    } 

    private async sendRequest<ReqBody extends Object, ResBody extends Object>
    (url: string, method: string = 'GET', body: ReqBody | null = null): Promise<ResBody | Error> {
        try {
            const headers: HeadersInit = body instanceof FormData ? {} : {
                'Content-Type': 'application/json'
            };
            const response = await fetch(url, { method, body: this.getBody(method, body), headers });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || 'Request error');
            return data;
        } catch (error) {
            return error as Error;
        }
    }

    private getBody(method: string, body: any) {
        if (method === 'GET') return null;
        if (body instanceof FormData) return body;
        return JSON.stringify(body);
    }

    private normalizeData(data: any) {
        return normalize(Array.isArray(data) ? data : [data], this.entitySchema);
    }

    private getPager(data: any) {
        const pageName = data.pager.paginationName;
        const entitiesData = data.entities;
        const normalizedEntities: any = this.normalizeData(entitiesData);
        const page = {
            ...data.pager,
            pageIds: normalizedEntities.result.length > 0 
                ? Object.keys(normalizedEntities.entities[this.entityName])
                : []
        }
        const action: IAction = {
            type: ReducerMethods.UPDATE,
            payload: { 
                entities: {
                    ...normalizedEntities.entities,
                    [pageName]: page 
                } 
            }
        }
        return action;
    }

    private generateToastify(message: string, status: ToastifyStatus): ToastifyAction {
        return {
            id: `${new Date().getTime() + Math.random()}`,
            message,
            status
        };
    }

    protected initSchema(opts: InitSchemaOpts) {
        this._entityName = opts.name;
        this._schema =
            opts.name && opts.name !== 'entity'
                ? [new schema.Entity(opts.name, opts.definitions, opts.options)]
                : [];
        this.sendRequest = this.sendRequest.bind(this);
    }

    protected *requestResult<ReqBody extends Object, ResBody extends Object>
    (config: HttpRequestConfig<ReqBody>, httpMethod: string, actionMethod: string) {
        let data: object | Error = yield call(this.sendRequest<ReqBody, ResBody>, config.url, httpMethod, config.body);
        let currentData: any = data;
        if (currentData.hasOwnProperty(MESSAGE)) {
            const isError = data instanceof Error;
            yield put({
                type: ToastifyEffectActions.ADD_TOASTIFY,
                payload: this.generateToastify(
                    currentData.message, isError ? ToastifyStatus.Error : ToastifyStatus.Success
                )
            });
            if (isError) return currentData;
        }
        const action = this.normalizeReqBody(currentData, actionMethod);
        yield put(action);
        return data as ResBody;
    }

    public get entityName(): string {
        return this._entityName;
    }

    public get entitySchema(): schema.Entity[] {
        return this._schema;
    }

    public normalizeReqBody(
        data: any, 
        actionMethod: string
    ): IAction {
        if (data.hasOwnProperty(PAGER)) {
            return this.getPager(data);
        }
        if (data.hasOwnProperty(ENTITIES)) {
            data = data.entities;
        }
        return {
            type: actionMethod,
            payload: this.normalizeData(data)
        };
    }
}