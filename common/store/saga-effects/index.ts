import { takeEvery } from "redux-saga/effects";
import { PropertyEffectActions, fetchLastOffers } from "./property.saga-effects";

export default function* mySaga() {
    yield takeEvery(PropertyEffectActions.GET_LAST_OFFERS, fetchLastOffers);
}