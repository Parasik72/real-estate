import Router from 'next/router';
import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { PropertyAddressModel } from "../property/property-address.model";
import { PropertyModel } from "../property/property.model";
import { UserModel } from "./user.model";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { call } from "redux-saga/effects";
import { ReducerMethods } from "@/common/store/reducer.methods";
import { EditProfileVariablesForm } from "@/common/types/profile.type";
import { FRONT_PATHS } from '@/common/constants/front-paths.constants';
import IContextContainer from '@/common/context/icontext-container';
import action from '@/common/decorators/action.decorator';

export enum UserEffectActions {
    GET_USER_PROFILE = 'users_getProfileByUserId',
    EDIT_PROFILE = 'users_editProfile',
}

export class UserService extends HttpService {
    constructor(ctx: IContextContainer) {
        super(ctx);
        this.initSchema('users', {}, {idAttribute: 'userId'});
    }

    @action()
    public *getProfileByUserId(payload: string) {
        yield call(
            this.get<UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] }>, 
            { url: BACK_PATHS.getProfileByUserId.replace(':userId', payload) },
            ReducerMethods.UPDATE
        );
    }

    @action()
    public *editProfile(payload: {
        values: EditProfileVariablesForm;
    }) {
        const res: Object = yield call(
            this.patch<EditProfileDto, { message: string }>, 
            { 
                url: BACK_PATHS.editProfile,
                body: payload.values
            },
            ReducerMethods.UPDATE
        );
        if (res instanceof Error) return;
        Router.push(FRONT_PATHS.home);
    }
}
