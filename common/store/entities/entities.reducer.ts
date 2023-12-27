import { Entity } from "../types/store.types";
import { ReducerMethods } from "../reducer.methods";
import { HYDRATE } from "next-redux-wrapper";

export type EntitiesState = Entity<Object>;

export interface IReducerAction {
    type: ReducerMethods | typeof HYDRATE;
    payload?: {
        entities?: Entity<Object>;
    };
}

let initialState: EntitiesState = {};

export const entitiesReducer = 
<TAction extends IReducerAction>(
    state = initialState, action: TAction, entityName: string
) => {
    switch(action.type) {
        case ReducerMethods.UPDATE: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            if (!(entityName in entities)) break;
            state = {
                ...state,
                ...entities[entityName],
            };
            break;
        }
        case ReducerMethods.DELETE: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            if (!(entityName in entities)) break;
            const keysToDelete = Object.keys(entities[entityName]);
            state = Object.keys(state)
                .filter(key => !keysToDelete.includes(key))
                .reduce((result: any, key) => {
                    result[key] = state[key];
                    return result;
                }, {});    
            break;
        }
        case ReducerMethods.CLEAN: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            if (!(entityName in entities)) break;
            state = {};
            break;
        }
    }
    return state;
}