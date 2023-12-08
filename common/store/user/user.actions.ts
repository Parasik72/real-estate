import { UserModel } from "@/common/services/user/user.model";
import { AddUserAction, UserActions } from "./user.action.interface";

export const addUserAction = (payload: UserModel): AddUserAction => 
    ({ type: UserActions.ADD_USER, payload });