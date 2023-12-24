import { Entity } from "../types/store.types";
import { ReducerMethods } from "../reducer.methods";
import { Paginations } from "./paginations.enum";
import { HYDRATE } from "next-redux-wrapper";
import { IPagination } from "@/common/types/common.types";

export type PaginationsState = Entity<IPagination>;

interface Pager {
    paginationName: string;
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    pageIds: number[]
    query?: Record<string, string>;
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
    state = initialState, action: TAction
) => {
    Object.values(Paginations).forEach((entityName) => {
        switch(action.type) {
            case ReducerMethods.UPDATE: {
                if (!action.payload || !action.payload.entities) break;
                const entities = action.payload.entities;
                if (!(entityName in entities)) break;
                const { ['pageIds']: pageIds, ['page']: page, ...entityData } = entities[entityName];
                state = {
                    ...state,
                    [entityName]: {
                        ...state[entityName],
                        ...entityData,
                        currentPage: page,
                        pages: {
                            ...state[entityName]?.['pages'],
                            [page]: {
                                ids: pageIds
                            }
                        }
                    },
                };
                break;
            }
            case ReducerMethods.DELETE: {
                if (!action.payload || !action.payload.entities) break;
                const entities = action.payload.entities;
                if (!(entityName in entities)) break;
                const { [entityName]: toDelete, ...newState } = state;
                state = newState;
                break;
            }
        }
    });
    return state;
}