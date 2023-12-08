import { UserModel } from "@/common/services/user/user.model";
import { StoreEntity } from "../types/store.types";

export interface UserState {
    entities: {
        users: StoreEntity<UserModel>
    }
}