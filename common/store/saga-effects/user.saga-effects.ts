import { UserModel } from "@/common/services/user/user.model";
import { SagaEffectAction } from "../types/saga.types";
import { PropertyModel } from "@/common/services/property/property.model";
import { call, put, takeEvery } from "redux-saga/effects";
import { userService } from "@/common/services/user/user.service";
import { normalize } from "normalizr";
import { addUserAction } from "../user/user.actions";
import { StoreEntity } from "../types/store.types";
import { setPropertiesAction } from "../property/property.actions";
import { PropertySchema } from "../normalizr/property.schema";
import { UserSchema } from "../normalizr/user.schema";

export enum UserEffectActions {
    GET_USER_PROFILE = 'GET_USER_PROFILE'
}

function* fetchUserProfile(action: SagaEffectAction<{ userId: string }>) {
    try {
        const response: UserModel & { Properties: PropertyModel[] } = 
            yield call(userService.getProfileByUserId.bind(userService, action.payload.userId));

        const propertySchema = new PropertySchema();
        const userSchema = new UserSchema();
        const schema = userSchema.getWithPropertiesSchema(propertySchema.getArraySchema());
        const normalizrData = normalize(response, schema);
        const user: UserModel = normalizrData?.entities?.users?.[action.payload.userId];
        const properties: StoreEntity<PropertyModel> = normalizrData?.entities?.properties!;

        yield put(addUserAction(user));
        yield put(setPropertiesAction(properties));
    } catch (e) {
        yield put({type: "USER_PROFILE_FETCH_FAILED", message: e});
    }
}

export function* watchUserProfile() {
    yield takeEvery(UserEffectActions.GET_USER_PROFILE, fetchUserProfile);
}
