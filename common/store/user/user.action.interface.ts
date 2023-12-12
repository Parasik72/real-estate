import { UserModel } from "@/common/services/user/user.model";
import { AuthUser } from "./user.state.interface";
import { StoreEntity } from "../types/store.types";

export enum UserActions {
    ADD_USER = 'ADD_USER',
    SET_AUTH_USER = 'SET_AUTH_USER',
    UNSET_AUTH_USER = 'UNSET_AUTH_USER',
    SET_USERS = 'SET_USERS',
};

export interface AddUserAction {
    type: UserActions.ADD_USER;
    payload: UserModel;
}

export interface SetAuthUserAction {
    type: UserActions.SET_AUTH_USER;
    payload: AuthUser;
}

export interface UnsetAuthUserAction {
    type: UserActions.UNSET_AUTH_USER;
}

export interface SetUsersAction {
    type: UserActions.SET_USERS;
    payload: StoreEntity<UserModel>;
}

export type UserAction = AddUserAction
                       | SetAuthUserAction
                       | UnsetAuthUserAction
                       | SetUsersAction;