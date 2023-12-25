import { Entity } from "../types/store.types";
import { ReducerMethods } from "../reducer.methods";
import { Paginations } from "./paginations.enum";
import { HYDRATE } from "next-redux-wrapper";
import { IPagination } from "@/common/types/common.types";

export type PaginationsState = IPagination;

interface Pager {
    paginationName: string;
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    pageIds: number[];
    query?: {
        key: string;
        value: string;
    };
}

export interface IReducerAction {
    type: ReducerMethods | typeof HYDRATE;
    payload?: {
        entities?: Entity<Pager>;
    };
}

let initialState: PaginationsState = {};

export const paginationsReducer = 
<TAction extends IReducerAction>(
    state = initialState, action: TAction, entityName: Paginations
) => {
    switch(action.type) {
        case ReducerMethods.UPDATE: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            if (!(entityName in entities)) break;
            const { ['pageIds']: pageIds, ['page']: page, ...entityData } = entities[entityName];
            if (entities[entityName]?.query) {
                const key = entities[entityName]?.query?.key!;
                if (entities[entityName]?.query?.value === '') {
                    const { [key]: toRemove, ...newState } = state.query as any;
                    state = { ...state, query: newState };
                } else {
                    state = {
                        ...state,
                        query: {
                            ...(state?.query || {}),
                            [key]: entities[entityName]?.query?.value as any
                        }
                    }
                }
            }
            if (page) {
                state = {
                    ...state,
                    ...entityData,
                    currentPage: page,
                    pages: {
                        ...state?.['pages'],
                        [page]: {
                            ids: pageIds
                        }
                    },
                };
            }
            break;
        }
        case ReducerMethods.DELETE: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            if (!(entityName in entities)) break;
            state = {};
            break;
        }
    }
    return state;
}