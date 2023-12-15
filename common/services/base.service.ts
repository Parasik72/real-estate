import { Schema, normalize, schema } from "normalizr";
import { IPagination } from "../types/common.types";
import { call, put } from "redux-saga/effects";
import { ReducerMethods } from "../store/reducer.methods";
import { Entity } from "../store/types/store.types";

export interface HttpRequestConfig<ReqBody extends Object> {
    url: string;
    body?: ReqBody;
    cleanEntities?: string[];
}

const paginationKeys: Array<keyof IPagination> = ['limit', 'offset', 'page', 'totalPages'];

export class BaseService {
    private _schema: schema.Entity[] = [];
    private _entityName: string = '';

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

    private isPaginationBody<TBody extends Object>(body: TBody) {
        return paginationKeys.every((key) => body.hasOwnProperty(key));
    }

    private extractPaginationAndData<TBody extends Object>(body: TBody) {
        const { 
            [this._entityName as keyof typeof body]: extData, 
            ...extPagination 
        } = body;
        return {extPagination: extPagination as any as IPagination, extData };
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
        if (this.isPaginationBody(data)) {
            const { extData, extPagination } = this.extractPaginationAndData(data);
            yield put({
                type: actionMethod,
                payload: { entities: { [extPagination.paginationName]: extPagination } }
            });
            data = extData;
        }
        const normalizrData = normalize(Array.isArray(data) ? data : [data], this._schema);
        yield put({
            type: actionMethod,
            payload: normalizrData
        });
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