import Router from 'next/router';
import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { SignInDto } from "../user/dto/sign-in.dto";
import { SignUpDto } from "../user/dto/sign-up.dto";
import { call, put } from "redux-saga/effects";
import { ReducerMethods } from "@/common/store/reducer.methods";
import { AuthUser, SignInVariablesForm, SignUpVariablesForm } from "@/common/types/auth.types";
import { FRONT_PATHS } from '@/common/constants/front-paths.constants';
import action from '@/common/decorators/action.decorator';
import reducer, { InitSchemaReducer } from '@/common/decorators/reducer.decorator';
import { Entities } from '@/common/store/entities/entities.enum';
import { authUserReducer } from '@/common/store/auth-user/auth-user.reducer';

export enum AuthUserEffectActions {
    GET_AUTH_USER = 'authUser_auth',
    LOG_OUT = 'authUser_logout',
    SIGN_IN = 'authUser_signIn',
    SIGN_UP = 'authUser_signUp',
}

const initSchema: InitSchemaReducer = {
    definitions: {},
    options: { idAttribute: 'isAuth' }
}

@reducer({
    entityName: Entities.AuthUser,
    reducerFunc: authUserReducer,
    initSchema
})
export class AuthService extends HttpService {
    @action()
    public *signIn(payload: {
        values: SignInVariablesForm,
    }) {
        const res: Object = yield call(
            this.post<SignInDto, AuthUser>, 
            { 
                body: payload.values,
                url: BACK_PATHS.signIn
            },
            ReducerMethods.UPDATE
        );
        if (res instanceof Error) return;
        Router.push(FRONT_PATHS.home);
    }

    @action()
    public *signUp(payload: {
        values: SignUpVariablesForm,
    }) {
        const res: Object = yield call(
            this.post<SignUpDto, { message: string }>, 
            { 
                body: payload.values,
                url: BACK_PATHS.signUp
            },
            ReducerMethods.UPDATE
        );
        if (res instanceof Error) return;
        Router.push(FRONT_PATHS.signIn);
    }

    @action()
    public *auth() {
        const res: { isAuth: boolean } = yield call(
            this.get<AuthUser>,
            { url: BACK_PATHS.auth },
            ReducerMethods.UPDATE
        );
        if (res.isAuth) return;
        const payload = { entities: { authUser: { true: { isAuth: false } } } };
        yield put({
            type: ReducerMethods.UPDATE,
            payload
        });
    }

    @action()
    public *logout() {
        yield call(
            this.get<{ message: string }>, 
            { url: BACK_PATHS.logout },
            ReducerMethods.CLEAN
        );
        yield put({
            type: ReducerMethods.CLEAN,
            payload: { entities: { deals: {} } }
        });
    }
}