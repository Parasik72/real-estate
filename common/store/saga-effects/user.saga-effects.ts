import { UserModel } from "@/common/services/user/user.model";
import { SagaEffectAction } from "../types/saga.types";
import { PropertyModel } from "@/common/services/property/property.model";
import { call, put, takeEvery } from "redux-saga/effects";
import { userService } from "@/common/services/user/user.service";
import { normalize, schema } from "normalizr";
import { addUserAction, setAuthUserAction, unsetAuthUserAction } from "../user/user.actions";
import { AuthUser } from "../user/user.state.interface";
import { SignInVariablesForm, SignUpVariablesForm } from "@/common/types/auth.types";
import { EditProfileVariablesForm } from "@/common/types/profile.type";

export enum UserEffectActions {
    GET_USER_PROFILE = 'GET_USER_PROFILE',
    GET_AUTH_USER = 'GET_AUTH_USER',
    LOG_OUT = 'LOG_OUT',
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
    EDIT_PROFILE = 'EDIT_PROFILE',
}

function* fetchUserProfile(action: SagaEffectAction<{ userId: string }>) {
    try {
        const response: UserModel & { Properties: PropertyModel[] } = 
            yield call(userService.getProfileByUserId.bind(userService, action.payload.userId));

        const userSchema = new schema.Entity('users', {}, {idAttribute: 'userId'});
        const normalizrData = normalize(response, userSchema);
        const user: UserModel = normalizrData?.entities?.users?.[action.payload.userId];

        yield put(addUserAction(user));
    } catch (e) {
        yield put({type: "USER_PROFILE_FETCH_FAILED", message: e});
    }
}

export function* watchUserProfile() {
    yield takeEvery(UserEffectActions.GET_USER_PROFILE, fetchUserProfile);
}

function* fetchAuthUser() {
    try {
        const response: AuthUser = yield call(userService.auth.bind(userService));
        yield put(setAuthUserAction(response));
    } catch (e) {
        yield put({type: "AUTH_USER_FETCH_FAILED", message: e});
    }
}

export function* watchAuthUser() {
    yield takeEvery(UserEffectActions.GET_AUTH_USER, fetchAuthUser);
}

function* logoutUser() {
    try {
        yield call(userService.logout.bind(userService));
        yield put(unsetAuthUserAction());
    } catch (e) {
        yield put({type: "LOG_OUT_USER_FAILED", message: e});
    }
}

export function* watchLogoutUser() {
    yield takeEvery(UserEffectActions.LOG_OUT, logoutUser);
}

function* signIn(action: SagaEffectAction<{
    values: SignInVariablesForm,
    callback: () => void
}>) {
    try {
        const response: AuthUser = yield call(userService.signIn.bind(userService, action.payload.values));
        if (response) {
            yield put(setAuthUserAction(response));
            action.payload.callback();
        } 
    } catch (e) {
        yield put({type: "SIGN_IN_USER_FAILED", message: e});
    }
}

export function* watchSignIn() {
    yield takeEvery(UserEffectActions.SIGN_IN, signIn);
}

function* signUp(action: SagaEffectAction<{
    values: SignUpVariablesForm,
    callback: () => void
}>) {
    try {
        const response: AuthUser = yield call(userService.signUp.bind(userService, action.payload.values));
        if (response) action.payload.callback(); 
    } catch (e) {
        yield put({type: "SIGN_UP_USER_FAILED", message: e});
    }
}

export function* watchSignUp() {
    yield takeEvery(UserEffectActions.SIGN_UP, signUp);
}

function* editProfile(action: SagaEffectAction<{
    values: EditProfileVariablesForm,
    callback: () => void
}>) {
    try {
        const response: { message: string } = 
            yield call(userService.editProfile.bind(userService, action.payload.values));
        if (!response) return;
        action.payload.callback(); 
    } catch (e) {
        yield put({type: "EDIT_PROFILE_FAILED", message: e});
    }
}

export function* watchEditProfile() {
    yield takeEvery(UserEffectActions.EDIT_PROFILE, editProfile);
}

export default [
    watchUserProfile(),
    watchAuthUser(),
    watchLogoutUser(),
    watchSignIn(),
    watchSignUp(),
    watchEditProfile()
];