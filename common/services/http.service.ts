import { sendRequest } from "../functions/http.functions";

interface HttpRequestConfig<ReqBody extends Object> {
    url: string;
    body?: ReqBody;
}

export class HttpService {
    constructor(
        private baseUrl: string = process.env.BACKEND_URL
    ) {}

    private getFullApiUrl(path: string) {
        return `${this.baseUrl || 'api'}/${path}`;
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