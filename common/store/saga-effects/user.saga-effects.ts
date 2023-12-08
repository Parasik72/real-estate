import { UserModel } from "@/common/services/user/user.model";
import { SagaEffectAction } from "../types/saga.types";
import { PropertyModel } from "@/common/services/property/property.model";
import { call, put, takeEvery } from "redux-saga/effects";
import { userService } from "@/common/services/user/user.service";
import { normalize, schema } from "normalizr";
import { addUserAction } from "../user/user.actions";
import { StoreEntity } from "../types/store.types";
import { setPropertiesAction } from "../property/property.actions";

export enum UserEffectActions {
    GET_USER_PROFILE = 'GET_USER_PROFILE'
}

function* fetchUserProfile(action: SagaEffectAction<{ userId: string }>) {
    try {
        const response: UserModel & { Properties: PropertyModel[] } = 
            yield call(userService.getProfileByUserId.bind(userService, action.payload.userId));
        const propertySchema = new schema.Entity('properties', {}, { idAttribute: 'propertyId' });
        const userSchema = new schema.Entity(
            'users', 
            { Properties: [propertySchema] },
            { idAttribute: 'userId' }
        );
        const normalizrData = normalize(response, userSchema);
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
