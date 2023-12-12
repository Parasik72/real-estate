import { all } from "redux-saga/effects";
import propertyWatchers from "./property.saga-effects";
import userWatchers from "./user.saga-effects";
import dealWatchers from "./deal.saga-effects";

export default function* rootSaga() {
    yield all([
        ...propertyWatchers,
        ...userWatchers,
        ...dealWatchers
    ]);
}