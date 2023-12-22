import { Entities } from "./entities.enum";
import { Entity } from "../types/store.types";
import { ReducerMethods } from "../reducer.methods";
import { HYDRATE } from "next-redux-wrapper";

export type EntitiesState = Entity<Entity<Object>>;

export interface IReducerAction {
    type: ReducerMethods | typeof HYDRATE;
    payload?: {
        entities?: Entity<Object>;
    };
}

let initialState: EntitiesState = {};

export const entitiesReducer = 
<TAction extends IReducerAction>(
    state = initialState, action: TAction
) => {
    Object.values(Entities).forEach((entityName) => {
        switch(action.type) {
            case ReducerMethods.UPDATE: {
                if (!action.payload || !action.payload.entities) break;
                const entities = action.payload.entities;
                if (!(entityName in entities)) break;
                state = {
                    ...state,
                    [entityName]: {
                        ...state[entityName],
                        ...entities[entityName],
                    },
                };
                break;
            }
            case ReducerMethods.DELETE: {
                if (!action.payload || !action.payload.entities) break;
                const entities = action.payload.entities;
                if (!(entityName in entities)) break;
                const keysToDelete = Object.keys(entities[entityName]);
                state = {
                    ...state,
                    [entityName as keyof EntitiesState]: Object.keys(state[entityName as keyof EntitiesState])
                        .filter(key => !keysToDelete.includes(key))
                        .reduce((result: any, key) => {
                            result[key] = state[entityName as keyof EntitiesState][key];
                            return result;
                        }, {}),
                };    
                break;
            }
            case ReducerMethods.CLEAN: {
                if (!action.payload || !action.payload.entities) break;
                const entities = action.payload.entities;
                if (!(entityName in entities)) break;
                state = {
                    ...state,
                    [entityName as keyof EntitiesState]: {}
                };
                break;
            }
        }
    })
    return state;
}