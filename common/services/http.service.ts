import { sendRequest } from "../functions/http.functions";

interface HttpRequestConfig<ReqBody extends Object> {
    url: string;
    body?: ReqBody;
}

export class HttpService {
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

    protected async get<ResBody extends Object>(config: HttpRequestConfig<Object>)
    : Promise<ResBody | null> {
        const data = await sendRequest<Object, ResBody>(
            this.getFullApiUrl(config.url),
            'GET'
        );
        if (data instanceof Error) return null;
        return data;
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
}