import { rootReducer } from "./root.reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga-effects";
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
})

sagaMiddleware.run(rootSaga);