import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { PropertyAddressModel } from "../property/property-address.model";
import { PropertyModel } from "../property/property.model";
import { UserModel } from "./user.model";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { call, take } from "redux-saga/effects";
import { ReducerMethods } from "@/common/store/reducer.methods";
import { SagaEffectAction } from "@/common/store/types/saga.types";
import { EditProfileVariablesForm } from "@/common/types/profile.type";

export enum UserEffectActions {
    GET_USER_PROFILE = 'GET_USER_PROFILE',
    EDIT_PROFILE = 'EDIT_PROFILE',
}

class UserService extends HttpService {
    constructor() {
        super();
        this.initSchema('users', {}, {idAttribute: 'userId'});
    }

    public *getProfileByUserId() {
        while (true) {
            const action: SagaEffectAction<string> = yield take(UserEffectActions.GET_USER_PROFILE);
            yield call(
                this.get<UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] }>, 
                { url: BACK_PATHS.getProfileByUserId.replace(':userId', action.payload) },
                ReducerMethods.UPDATE
            );
        }
    }

    public *editProfile() {
        while (true) {
            const action: SagaEffectAction<{
                values: EditProfileVariablesForm;
                callback: () => void;
            }> = yield take(UserEffectActions.EDIT_PROFILE);
            const res: Object = yield call(
                this.patch<EditProfileDto, { message: string }>, 
                { 
                    url: BACK_PATHS.editProfile,
                    body: action.payload.values
                },
                ReducerMethods.UPDATE
            );
            if (res instanceof Error) continue;
            action.payload.callback();
        }
    }
}

export const userService = new UserService;