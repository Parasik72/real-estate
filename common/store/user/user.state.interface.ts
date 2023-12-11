import { UserModel } from "@/common/services/user/user.model";
import { StoreEntity } from "../types/store.types";

export interface AuthUser {
    isAuth: boolean;
    userId?: string;
}

export interface UserState {
    authUser: AuthUser;
    entities: {
        users: StoreEntity<UserModel>
    }
}