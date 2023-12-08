import { UserModel } from "@/common/services/user/user.model";

export enum UserActions {
    ADD_USER = 'ADD_USER'
};

export interface AddUserAction {
    type: UserActions.ADD_USER;
    payload: UserModel;
}

export type UserAction = AddUserAction;