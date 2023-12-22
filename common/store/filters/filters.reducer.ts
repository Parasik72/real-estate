import { FiltersMethods } from "./filters.methods";

export interface FiltersState {
    [key: string]: string;
}

export interface IReducerAction {
    type: FiltersMethods;
    payload?: {
        key: string;
        value: string;
    };
}

const initialState: FiltersState = {}

export const filtersReducer = 
<TAction extends IReducerAction>(
    state = initialState, action: TAction
) => {
    switch(action.type) {
        case FiltersMethods.UPDATE: {
            if (!action.payload) break;
            if (state[action.payload.key] && action.payload.value === '') {
                const { [action.payload.key]: toRemove, ...newState } = state;
                state = { ...newState };
                break;
            }
            state = {
                ...state,
                [action.payload.key]: action.payload.value
            }
            break;
        }
        case FiltersMethods.CLEAN: {
            state = {};    
            break;
        }
    }
    return state;
}