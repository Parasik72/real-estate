import { ReducerMethods } from "../store/reducer.methods";
import { BaseService, HttpRequestConfig } from "./base.service";

enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}
export class HttpService extends BaseService {
    constructor() {
        super();
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.patch = this.patch.bind(this);
        this.delete = this.delete.bind(this);
        this.toFormData = this.toFormData.bind(this);
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

    protected get = <ResBody extends Object>
    (config: HttpRequestConfig<Object>, reducerMethod: ReducerMethods) => {
        return this.requestResult<{}, ResBody>(
            {...config, url: this.getFullApiUrl(config.url)}, 
            HttpMethods.GET, 
            reducerMethod
        );
    }

    protected post = <ReqBody extends Object, ResBody extends Object>
    (config: HttpRequestConfig<ReqBody>, reducerMethod: ReducerMethods) => {
        return this.requestResult<ReqBody, ResBody>(
            {...config, url: this.getFullApiUrl(config.url)}, 
            HttpMethods.POST, 
            reducerMethod
        );
    }

    protected patch = <ReqBody extends Object, ResBody extends Object>
    (config: HttpRequestConfig<ReqBody>, reducerMethod: ReducerMethods) => {
        return this.requestResult<ReqBody, ResBody>(
            {...config, url: this.getFullApiUrl(config.url)},
            HttpMethods.PATCH, 
            reducerMethod
        );
    }

    protected delete = <ReqBody extends Object, ResBody extends Object>
    (config: HttpRequestConfig<ReqBody>, reducerMethod: ReducerMethods) => {
        return this.requestResult<ReqBody, ResBody>(
            {...config, url: this.getFullApiUrl(config.url)}, 
            HttpMethods.DELETE, 
            reducerMethod
        );
    }
}