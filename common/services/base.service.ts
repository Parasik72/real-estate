import { Schema, schema } from "normalizr";
import { call, fork, put, take } from "redux-saga/effects";
import { ReducerMethods } from "../store/reducer.methods";
import { Entity } from "../store/types/store.types";
import BaseContext from "../context/base-context";
import IContextContainer from "../context/icontext-container";
import { sagaAction } from "../functions/saga.functions";
import { SagaEffectAction } from "../store/types/saga.types";
import { normalizeReqBody } from "../functions/http.functions";
import 'reflect-metadata';
export interface HttpRequestConfig<ReqBody extends Object> {
    url: string;
    body?: ReqBody;
    cleanEntities?: string[];
}

export interface ISagaMethod {
    className: string;
    methodName: string;
}

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

    public get entityName(): string {
        return this._entityName;
    }

    public get entitySchema(): schema.Entity[] {
        return this._schema;
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

    private generatePayloadForClean(entities: string[]) {
        let toClean = { entities: {} as Entity<Object> };
        entities.forEach((key) => {
            toClean.entities[key] = {}
        });
        return toClean;
    }

    protected *requestResult<ReqBody extends Object, ResBody extends Object>
    (config: HttpRequestConfig<ReqBody>, httpMethod: string, actionMethod: string) {
        if (config.cleanEntities && config.cleanEntities.length > 0) {
            yield put({
                type: ReducerMethods.CLEAN,
                payload: this.generatePayloadForClean(config.cleanEntities)
            });
        }
        let data: object | Error = yield call(this.sendRequest<ReqBody, ResBody>, config.url, httpMethod, config.body);
        const actions = normalizeReqBody(data, this._entityName, this._schema, actionMethod);
        for(const action of actions) {
            yield put(action);
        }
        return data as ResBody;
    }

    private getBody = (method: string, body: any) => {
        if (method === 'GET') return null;
        if (body instanceof FormData) return body;
        return JSON.stringify(body);
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
}