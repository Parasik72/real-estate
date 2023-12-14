import { UserModel } from "@/common/services/user/user.model";
import { AuthUser } from "./user.state.interface";
import { StoreEntity } from "../types/store.types";

export enum UserActions {
    ADD_USER = 'ADD_USER',
    SET_AUTH_USER = 'SET_AUTH_USER',
    UNSET_AUTH_USER = 'UNSET_AUTH_USER',
    SET_USERS = 'SET_USERS',
    ADD_USERS = 'ADD_USERS',
    UPDATE_USER = 'UPDATE_USER',
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

export interface AddUsersAction {
    type: UserActions.ADD_USERS;
    payload: StoreEntity<UserModel>;
}

export interface UpdateUserAction {
    type: UserActions.UPDATE_USER;
    payload: UserModel;
}

export type UserAction = AddUserAction
                       | SetAuthUserAction
                       | UnsetAuthUserAction
                       | SetUsersAction
                       | AddUsersAction
                       | UpdateUserAction;