import { UserModel } from "@/common/services/user/user.model";
import { AddUserAction, SetAuthUserAction, UnsetAuthUserAction, UserActions } from "./user.action.interface";
import { AuthUser } from "./user.state.interface";

export const addUserAction = (payload: UserModel): AddUserAction => 
    ({ type: UserActions.ADD_USER, payload });

export const setAuthUserAction = (payload: AuthUser): SetAuthUserAction => 
    ({ type: UserActions.SET_AUTH_USER, payload });

export const unsetAuthUserAction = (): UnsetAuthUserAction => 
    ({ type: UserActions.UNSET_AUTH_USER });