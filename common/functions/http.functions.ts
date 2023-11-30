const getBody = (method: string, body: any) => {
    return method === 'GET' ? null : JSON.stringify(body);
}

export async function sendRequest<ReqBody extends Object, ResBody extends Object>
(url: string, method: string = 'GET', body: ReqBody | null = null): Promise<ResBody | Error> {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        };
        const response = await fetch(url, { method, body: getBody(method, body), headers });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || 'Request error');
        return data;
    } catch (error) {
        return error as Error;
    }
}