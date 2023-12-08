import { UserAction, UserActions } from "./user.action.interface"
import { UserState } from "./user.state.interface"

const defaultState: UserState = {
    entities: {
        users: {}
    }
}

export const userReducer = (state = defaultState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActions.ADD_USER: {
            const user = action.payload;
            return {
                entities: {
                    ...state.entities,
                    users: {
                        ...state.entities.users,
                        [user.userId]: user
                    }
                }
            };
        }
        default: return state;
    }
}