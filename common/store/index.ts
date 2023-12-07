import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./root.reducer";
import createSagaMiddleware from "redux-saga";
import mySaga from "./saga-effects";

const sagaMiddleware: any = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware) as any
);

sagaMiddleware.run(mySaga);