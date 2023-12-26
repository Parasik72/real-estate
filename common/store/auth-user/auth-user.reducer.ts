import { ReducerMethods } from "../reducer.methods";

export interface AuthUserState {
    isReady: boolean;
    isAuth: boolean;
    userId?: string;
}

export interface IReducerAction {
    type: ReducerMethods;
    payload?: {
        entities?: {
            authUser?: {
                true: {
                    isAuth: boolean;
                    userId?: string;
                }
            }
        }
    };
}

const initialState: AuthUserState = {
    isReady: false,
    isAuth: false
}

export const authUserReducer = 
<TAction extends IReducerAction>(
    state = initialState, action: TAction
) => {
    switch(action.type) {
        case ReducerMethods.UPDATE: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            if (!entities.authUser || !entities.authUser.true) break;
            state = {
                ...entities.authUser.true,
                isReady: true
            };
            break;
        }
        case ReducerMethods.CLEAN: {
            if (!action.payload || !action.payload.entities) break;
            const entities = action.payload.entities;
            if (!entities.authUser) break;
            state = initialState;
            break;
        }
    }
    return state;
}