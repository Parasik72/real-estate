import { Schema, normalize, schema } from "normalizr";
import { call, fork, put, take } from "redux-saga/effects";
import { ReducerMethods } from "../store/reducer.methods";
import BaseContext from "../context/base-context";
import IContextContainer from "../context/icontext-container";
import { sagaAction } from "../functions/saga.functions";
import { SagaEffectAction } from "../store/types/saga.types";
import { ToastifyAction, ToastifyStatus } from "../store/toastify/toastify.types";
import 'reflect-metadata';

export interface HttpRequestConfig<ReqBody extends Object> {
    url: string;
    body?: ReqBody;
}

export interface ISagaMethod {
    className: string;
    methodName: string;
}

export enum ToastifyEffectActions {
    ADD_TOASTIFY = 'toastify_addToastify',
}

interface IAction {
    type: string; 
    payload: Object;
}

const MESSAGE = 'message';
const PAGER = 'pager';

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

    private async sendRequest<ReqBody extends Object, ResBody extends Object>
    (url: string, method: string = 'GET', body: ReqBody | null = null): Promise<ResBody | Error> {
        try {
            const headers: HeadersInit = body instanceof FormData ? {} : {
                'Content-Type': 'application/json'
            };
            const response = await fetch(url, { method, body: this.getBody(method, body), headers });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.error || 'Request error');
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
        const entitiesData = data[pageName];
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

    protected initSchema(
        name: string,
        definitions: Schema = {},
        options: schema.EntityOptions = {},
    ) {
        this._entityName = name;
        this._schema =
            name && name !== 'entity'
                ? [new schema.Entity(name, definitions, options)]
                : [];
        this.sendRequest = this.sendRequest.bind(this);
    }

    protected *requestResult<ReqBody extends Object, ResBody extends Object>
    (config: HttpRequestConfig<ReqBody>, httpMethod: string, actionMethod: string) {
        let data: object | Error = yield call(this.sendRequest<ReqBody, ResBody>, config.url, httpMethod, config.body);
        let currentData = data;
        if (data instanceof Error) {
            yield put({
                type: ToastifyEffectActions.ADD_TOASTIFY,
                payload: this.generateToastify(data.message, ToastifyStatus.Error)
            });
            return currentData;
        }
        if (data.hasOwnProperty(MESSAGE)) {
            const { [MESSAGE]: message, ...otherData } = data as any;
            yield put({
                type: ToastifyEffectActions.ADD_TOASTIFY,
                payload: this.generateToastify(message, ToastifyStatus.Success)
            });
            const keys = Object.keys(otherData);
            if (keys.length > 0) {
                currentData = otherData[keys[0]];
            }
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
        return {
            type: actionMethod,
            payload: this.normalizeData(data)
        };
    }
}