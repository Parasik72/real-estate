import { Entities } from "./entities.enum";
import { Entity } from "./types/store.types";

export type EntitiesState = Entity<Entity<Object>>;

export enum EntityMethod {
    UPDATE = 'ENTITY_UPDATE',
    DELETE = 'ENTITY_DELETE'
}

export interface IReducerAction {
    type: EntityMethod;
    payload?: {
        entities?: Entity<Object>;
    };
}

export const entitiesReducer = 
<TAction extends IReducerAction>(
    state: EntitiesState = {}, action: TAction, entityReducer: Entities
) => {
    switch(action.type) {
        case EntityMethod.UPDATE: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            state = {
                ...state,
                [entityReducer]: {
                    ...state[entityReducer],
                    ...entities[entityReducer],
                },
            };
            break;
        }
        case EntityMethod.DELETE: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            if (entityReducer in entities) {
                const keysToDelete = Object.keys(entities[entityReducer]);
                state = {
                    ...state,
                    [entityReducer as keyof EntitiesState]: Object.keys(state[entityReducer as keyof EntitiesState])
                        .filter(key => !keysToDelete.includes(key))
                        .reduce((result: any, key) => {
                            result[key] = state[entityReducer as keyof EntitiesState][key];
                            return result;
                        }, {}),
                };
            }
            break;
        }
    }
    return state;
}