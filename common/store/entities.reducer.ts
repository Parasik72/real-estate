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

const removeFromState = (state: EntitiesState, entityReducer: Entities, entities: Entity<Object>) => {
    if (!(entityReducer in entities)) return state;
    Object.keys(entities[entityReducer]).forEach((stateKey) => {
        const { [stateKey]: value, ...newState } = state[entityReducer as keyof EntitiesState]; 
        state[entityReducer as keyof EntitiesState] = newState;
    });
    return state;
}

export const entitiesReducer = 
<TAction extends IReducerAction>(
    state: EntitiesState = {}, action: TAction, entityReducer: Entities
) => {
    switch(action.type) {
        case EntityMethod.UPDATE: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            removeFromState(state, entityReducer, entities);
            // state[entityReducer as keyof EntitiesState] = {
            //     ...state[entityReducer as keyof EntitiesState],
            //     ...entities[entityReducer]
            // };
            break;
        }
        case EntityMethod.DELETE: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            state = removeFromState(state, entityReducer, entities);
        }
    }
    console.log('state', state)
    return state;
}