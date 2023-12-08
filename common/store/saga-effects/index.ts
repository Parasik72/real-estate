import { all } from "redux-saga/effects";
import { watchAllOffers, watchLastOffers, watchProperty } from "./property.saga-effects";
import { watchUserProfile } from "./user.saga-effects";

export default function* rootSaga() {
    yield all([
        watchLastOffers(),
        watchAllOffers(),
        watchProperty(),
        watchUserProfile()
    ]);
}