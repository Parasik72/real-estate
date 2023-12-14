import { UserAction, UserActions } from "./user.action.interface"
import { UserState } from "./user.state.interface"

const defaultState: UserState = {
    authUser: { isAuth: false },
    entities: {
        users: {
            byId: {},
            allIds: []
        }
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
                        byId: {
                            ...state.entities.users.byId,
                            [user.userId]: user
                        },
                        allIds: [...state.entities.users.allIds, user.userId]
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
        case UserActions.SET_USERS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    users: action.payload
                }
            }
        case UserActions.ADD_USERS: {
            const allIdsSet = new Set([
                ...state.entities.users.allIds, 
                ...action.payload.allIds
            ]);
            const allIds =  Array.from(allIdsSet);
            return {
                ...state,
                entities: {
                    ...state.entities,
                    users: {
                        ...state.entities.users,
                        byId: {
                            ...state.entities.users.byId,
                            ...action.payload.byId
                        },
                        allIds
                    }
                }
            }
        }
        case UserActions.UPDATE_USER:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    users: {
                        ...state.entities.users,
                        byId: {
                            ...state.entities.users.byId,
                            [action.payload.userId]: action.payload
                        }
                    }
                }
            }
        default: return state;
    }
}