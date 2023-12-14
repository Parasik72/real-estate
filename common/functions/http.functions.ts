const getBody = (method: string, body: any) => {
    if (method === 'GET') return null;
    if (body instanceof FormData) return body;
    return JSON.stringify(body);
}

export async function sendRequest<ReqBody extends Object, ResBody extends Object>
(url: string, method: string = 'GET', body: ReqBody | null = null): Promise<ResBody | Error> {
    try {
        const headers: HeadersInit = body instanceof FormData ? {} : {
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

export const generateQueryString = <T extends Object>(queryObj: T) => {
    const entries = Object.entries(queryObj);
    if (entries.length === 0) return null;
    let query = '?';
    entries.forEach((value, index) => {
        if (!value[1]) return;
        query += `${value[0]}=${value[1]}${index !== entries.length - 1 ? '&' : ''}`;
    });
    return query;
}