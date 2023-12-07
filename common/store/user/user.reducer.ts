import { UserAction, UserActions } from "./user.action.interface"
import { UserState } from "./user.state.interface"

const defaultState: UserState = {
    profile: undefined
}

export const userReducer = (state = defaultState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActions.SET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default: return state;
    }
}