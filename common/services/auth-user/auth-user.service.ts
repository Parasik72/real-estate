import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { SignInDto } from "../user/dto/sign-in.dto";
import { SignUpDto } from "../user/dto/sign-up.dto";
import { call, take, takeEvery } from "redux-saga/effects";
import { ReducerMethods } from "@/common/store/reducer.methods";
import { SagaEffectAction } from "@/common/store/types/saga.types";
import { AuthUser, SignInVariablesForm, SignUpVariablesForm } from "@/common/types/auth.types";

export enum AuthUserEffectActions {
    GET_AUTH_USER = 'GET_AUTH_USER',
    LOG_OUT = 'LOG_OUT',
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
}

class AuthService extends HttpService {
    constructor() {
        super();
        this.initSchema('authUser', {}, { idAttribute: 'isAuth' });
    }

    public *signIn() {
        while (true) {
            const action: SagaEffectAction<{
                values: SignInVariablesForm,
                callback: () => void
            }> = yield take(AuthUserEffectActions.SIGN_IN);
            const res: Object = yield call(
                this.post<SignInDto, AuthUser>, 
                { 
                    body: action.payload.values,
                    url: BACK_PATHS.signIn
                },
                ReducerMethods.UPDATE
            );
            if (res instanceof Error) continue;
            action.payload.callback();
        }
    }

    public *signUp() {
        while (true) {
            const action: SagaEffectAction<{
                values: SignUpVariablesForm,
                callback: () => void
            }> = yield take(AuthUserEffectActions.SIGN_UP);
            const res: Object = yield call(
                this.post<SignUpDto, { message: string }>, 
                { 
                    body: action.payload.values,
                    url: BACK_PATHS.signUp
                },
                ReducerMethods.UPDATE
            );
            if (res instanceof Error) continue;
            action.payload.callback();
        }
    }

    public *auth() {
        yield takeEvery(
            AuthUserEffectActions.GET_AUTH_USER,
            this.get<AuthUser>,
            { url: BACK_PATHS.auth },
            ReducerMethods.UPDATE
        );
    }

    public *logout() {
        yield takeEvery(
            AuthUserEffectActions.LOG_OUT, 
            this.get<{ message: string }>, 
            { url: BACK_PATHS.logout },
            ReducerMethods.CLEAN
        );
    }
}

export const authUserService = new AuthService;