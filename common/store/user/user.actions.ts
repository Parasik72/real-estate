import { UserModel } from "@/common/services/user/user.model";
import { AddUserAction, AddUsersAction, SetAuthUserAction, SetUsersAction, UnsetAuthUserAction, UserActions } from "./user.action.interface";
import { AuthUser } from "./user.state.interface";
import { StoreEntity } from "../types/store.types";

export const addUserAction = (payload: UserModel): AddUserAction => 
    ({ type: UserActions.ADD_USER, payload });

export const setAuthUserAction = (payload: AuthUser): SetAuthUserAction => 
    ({ type: UserActions.SET_AUTH_USER, payload });

export const unsetAuthUserAction = (): UnsetAuthUserAction => 
    ({ type: UserActions.UNSET_AUTH_USER });

export const setUsersAction = (payload: StoreEntity<UserModel>): SetUsersAction => 
    ({ type: UserActions.SET_USERS, payload });

export const addUsersAction = (payload: StoreEntity<UserModel>): AddUsersAction => 
    ({ type: UserActions.ADD_USERS, payload });