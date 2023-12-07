import { propertyService } from "@/common/services/property/property.service";
import { call, put } from "redux-saga/effects";
import { ResponseGenerator } from "./response-generator";
import { setLastOffersAction } from "../property/property.actions";

export enum PropertyEffectActions {
    GET_LAST_OFFERS = 'GET_LAST_OFFERS'
}

export function* fetchLastOffers() {
    try {
        const response: ResponseGenerator = yield call(propertyService.getLastOffers);
        yield put(setLastOffersAction(response.data));
    } catch (e) {
        yield put({type: "LAST_OFFERS_FETCH_FAILED", message: e});
    }
}