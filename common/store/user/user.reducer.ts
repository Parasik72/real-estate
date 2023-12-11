import { UserAction, UserActions } from "./user.action.interface"
import { UserState } from "./user.state.interface"

const defaultState: UserState = {
    authUser: { isAuth: false },
    entities: {
        users: {}
    }
}

export const userReducer = (state = defaultState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActions.ADD_USER: {
            const user = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    users: {
                        ...state.entities.users,
                        [user.userId]: user
                    }
                }
            };
        }
        case UserActions.SET_AUTH_USER: 
            return {
                ...state,
                authUser: action.payload
            }
        case UserActions.UNSET_AUTH_USER:
            return {
                ...state,
                authUser: {
                    isAuth: false,
                    userId: undefined
                }
            }
        default: return state;
    }
}