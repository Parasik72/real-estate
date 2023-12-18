import { Dispatch, Store, applyMiddleware, compose } from "redux";
import BaseContext from "../context/base-context";
import IContextContainer from "../context/icontext-container";
import { Entities } from "./entities/entities.enum";
import { Entity } from "./types/store.types";
import { Paginations } from "./paginations/paginations.enum";
import { AuthUserState } from "./auth-user/auth-user.reducer";
import { PropertyModel } from "../services/property/property.model";
import { PropertyImageModel } from "../services/property/property-image.model";
import { UserModel } from "../services/user/user.model";
import { DealModel } from "../services/deal/deal.model";
import { IPagination } from "../types/common.types";
import { BaseService } from "../services/base.service";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer";

interface IRootReducer {
    entities: {
        [Entities.Property]: Entity<PropertyModel>,
        [Entities.PropertyImage]: Entity<PropertyImageModel>,
        [Entities.User]: Entity<UserModel>,
        [Entities.Deal]: Entity<DealModel>,
    };
    paginations: {
        [Paginations.AllOffers]?: IPagination;
        [Paginations.MySuccessfulDeals]?: IPagination;
        [Paginations.RequestedByMeDeals]?: IPagination;
        [Paginations.RequestedForMeDeals]?: IPagination;
        [Paginations.UserProperties]?: IPagination;
    };
    authUser: AuthUserState;
}

export class ReduxStore extends BaseContext {
    private _store: EnhancedStore<IRootReducer>;
    private _sagas: ReturnType<typeof BaseService.sagas>;

    constructor(ctx: IContextContainer) {
        super(ctx);
        this.rootSaga = this.rootSaga.bind(this);
        this._sagas = BaseService.sagas(ctx);
        const isDebug =
            process.env.NODE_ENV as string === 'local' ||
            process.env.DEBUG_PROD === 'true';
        this._store = isDebug 
            ? this.configureDevStore() 
            : this.configureProdStore();
    }

    public get store(): Store<IRootReducer> {
        return this._store;
    }

    public state = (): IRootReducer => {
        return this._store.getState();
    };

    public dispatch = (args: any): Dispatch => {
        return this._store.dispatch(args);
    };

    private *rootSaga() {
        yield all(this._sagas);
    }

    private configureProdStore() {
        const sagaMiddleware = createSagaMiddleware();
        const store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware): any =>
                getDefaultMiddleware({ serializableCheck: false }).concat([sagaMiddleware]),
        });
        sagaMiddleware.run(this.rootSaga);
        return store;
    }

    private configureDevStore = () => {
        const middleware: any[] = [];
        const enhancers: any[] = [];

        const sagaMiddleware = createSagaMiddleware();
        middleware.push(sagaMiddleware);

        const composeEnhancers = (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                  // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
              })
            : compose;
        enhancers.push(applyMiddleware(...middleware));
        const enhancer = composeEnhancers(...enhancers);
        const store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware): any =>
                getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
            enhancers: enhancer
        });

        sagaMiddleware.run(this.rootSaga);
        return store;
    };
}