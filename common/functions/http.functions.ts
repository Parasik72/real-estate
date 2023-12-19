import { normalize, schema } from "normalizr";
import { ReducerMethods } from "../store/reducer.methods";
import { IPagination } from "../types/common.types";

export const generateQueryString = <T extends Object>(queryObj: T) => {
    const entries = Object.entries(queryObj).filter((value) => {
        return value[1] !== null && value[1] !== undefined;
    });
    if (entries.length === 0) return '';
    let query = '?';
    entries.forEach((value, index) => {
        if (!value[1]) return;
        query += `${value[0]}=${value[1]}${index !== entries.length - 1 ? '&' : ''}`;
    });
    return query;
}

const paginationKeys: Array<keyof IPagination> = 
    ['limit', 'offset', 'page', 'totalPages', 'paginationName'];

const extractPaginationAndData = <TBody extends Object>(body: TBody, entityName: string) => {
    const { 
        [entityName as keyof typeof body]: extData, 
        ...extPagination 
    } = body;
    return {extPagination: extPagination as any as IPagination, extData };
}

const isPaginationBody = <TBody extends Object>(body: TBody) => {
    return paginationKeys.every((key) => body.hasOwnProperty(key));
}

interface IAction {
    type: string; 
    payload: Object;
}

export const normalizeReqBody = (
    data: any, 
    entityName: string, 
    entitySchema: schema.Entity[],
    actionMethod: string
): IAction[] => {
    let actions: IAction[] = []
    if (isPaginationBody(data)) {
        const { extData, extPagination } = extractPaginationAndData(data, entityName);
        actions.push({
            type: ReducerMethods.UPDATE,
            payload: { entities: { [extPagination.paginationName]: extPagination }, result: [] }
        });
        data = extData;
    }
    const normalizrData = normalize(Array.isArray(data) ? data : [data], entitySchema);
    actions.push({
        type: actionMethod,
        payload: normalizrData
    });
    return actions;
}