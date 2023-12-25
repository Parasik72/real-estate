import { ToastifyMethods } from "./toastify.methods";
import { ToastifyAction } from "./toastify.types";

export interface ToastifyState {
    actions: ToastifyAction[];
}

export interface IReducerAction {
    type: ToastifyMethods;
    payload?: ToastifyAction;
}

const initialState: ToastifyState = {
    actions: []
};

export const toastifyReducer = 
<TAction extends IReducerAction>(
    state = initialState, action: TAction
) => {
    switch(action.type) {
        case ToastifyMethods.UPDATE: {
            if (!action.payload) break;
            state = {
                ...state,
                actions: [...state.actions, action.payload]
            }
            break;
        }
        case ToastifyMethods.DELETE: {
            if (!action.payload) break;
            state = {
                ...state,
                actions: state.actions.filter((act) => act.id !== action.payload?.id)
            };    
            break;
        }
        case ToastifyMethods.CLEAN: {
            state = { actions: [] };    
            break;
        }
    }
    return state;
}