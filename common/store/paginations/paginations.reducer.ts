import { Entity } from "../types/store.types";
import { ReducerMethods } from "../reducer.methods";
import { Paginations } from "./paginations.enum";

export type PaginationsState = Entity<Object>;

export interface IReducerAction {
    type: ReducerMethods;
    payload?: {
        entities?: Entity<Object>;
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
                state = {
                    ...state,
                    [entityName]: entities[entityName],
                };
                break;
            }
            case ReducerMethods.DELETE: {
                if (!action.payload || !action.payload.entities) break;
                const entities = action.payload.entities;
                if (!(entityName in entities)) break;
                state = {
                    ...state,
                    [entityName as keyof PaginationsState]: {}
                };    
                break;
            }
        }
    })
    return state;
}