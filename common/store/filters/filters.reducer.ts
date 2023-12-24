import { Entity } from "../types/store.types";
import { Filters } from "./filters.enum";
import { FiltersMethods } from "./filters.methods";

export type FiltersState = Entity<Entity<string>>;

export interface IReducerAction {
    type: FiltersMethods;
    payload?: {
        entities?: Entity<{
            key: string;
            value: string;
        }>;
    };
}

let initialState: FiltersState = {}

Object.values(Filters).forEach((entityKey) => {
    initialState = {
        ...initialState,
        [entityKey]: {}
    }
});

export const filtersReducer = 
<TAction extends IReducerAction>(
    state = initialState, action: TAction
) => {
    Object.values(Filters).forEach((entityName) => {
        switch(action.type) {
            case FiltersMethods.UPDATE: {
                if (!action.payload || !action.payload.entities) break;
                const entities = action.payload.entities;
                if (!(entityName in entities)) break;
                if (state?.[entityName]?.key && entities[entityName].value === '') {
                    const { [entities[entityName].key]: toRemove, ...newState } = state;
                    state = { ...newState };
                    break;
                }
                state = {
                    ...state,
                    [entityName]: {
                        ...state?.[entityName],
                        [entities[entityName].key]: entities[entityName].value
                    }
                }
                break;
            }
            case FiltersMethods.CLEAN: {
                state = {};    
                break;
            }
        }
    })
    return state;
}