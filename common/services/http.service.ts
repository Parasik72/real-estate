import { normalize, schema } from "normalizr";
import { sendRequest } from "../functions/http.functions";
import { call, put } from "redux-saga/effects";
import { EntityMethod } from "../store/entities.reducer";

interface HttpRequestConfig<ReqBody extends Object> {
    url: string;
    body?: ReqBody;
}

enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export class HttpService {
    private _schema: any;
    private _entityName: string | null = null;

    protected initSchema(
        name: string | null = null,
        definitions: any = {},
        options: any = {},
    ) {
        this._entityName = name;
        this._schema =
            name && name !== 'entity'
                ? [new schema.Entity(name, definitions, options)]
                : null;
        
        this.get = this.get.bind(this);
    }

    private getFullApiUrl(path: string) {
        return `${'/api'}/${path}`;
    }

    protected toFormData<T extends Object>(body: T) {
        const formData = new FormData;
        Object.entries(body).map((value) => {
            if (value[1] instanceof FileList) {
                for(let i = 0; i < value[1].length; ++i) {
                    formData.append(`${value[0]}`, value[1].item(i) || '');
                }
            } else if(value[1] instanceof Array) {
                for(let i = 0; i < value[1].length; ++i) {
                    formData.append(`${value[0]}[${i}]`, value[1][i]);
                }
            } else {
                formData.append(value[0], value[1]);
            }
        });
        return formData;
    }

    protected get = <ResBody extends Object>(config: HttpRequestConfig<Object>) => {
        return this.requestResult<{}, ResBody>(config, HttpMethods.GET, EntityMethod.UPDATE);
    }

    protected async post<ReqBody extends Object, ResBody extends Object>(config: HttpRequestConfig<ReqBody>)
    : Promise<ResBody | null>  {
        const data = await sendRequest<ReqBody, ResBody>(
            this.getFullApiUrl(config.url),
            'POST',
            config.body
        );
        if (data instanceof Error) return null;
        return data;
    }

    protected async patch<ReqBody extends Object, ResBody extends Object>(config: HttpRequestConfig<ReqBody>)
    : Promise<ResBody | null>  {
        const data = await sendRequest<ReqBody, ResBody>(
            this.getFullApiUrl(config.url),
            'PATCH',
            config.body
        );
        if (data instanceof Error) return null;
        return data;
    }

    protected async delete<ReqBody extends Object, ResBody extends Object>(config: HttpRequestConfig<ReqBody>)
    : Promise<ResBody | null>  {
        const data = await sendRequest<ReqBody, ResBody>(
            this.getFullApiUrl(config.url),
            'DELETE',
            config.body
        );
        if (data instanceof Error) return null;
        return data;
    }

    private *requestResult<ReqBody extends Object, ResBody extends Object>
    (config: HttpRequestConfig<ReqBody>, httpMethod: string, actionMethod: string) {
        const data: ResBody = yield call(sendRequest<ReqBody, ResBody>, this.getFullApiUrl(config.url), httpMethod);
        const normalizrData = normalize(Array.isArray(data) ? data : [data], this._schema);
        yield put({
            type: actionMethod,
            payload: normalizrData
        });
        return data;
    }
}