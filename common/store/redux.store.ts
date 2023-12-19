import { AnyAction, Dispatch, Store, applyMiddleware, compose } from "redux";
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
import { createWrapper } from "next-redux-wrapper";
import { AwilixContainer } from "awilix";
import { BaseController } from "@/server/controllers/base-controller";
import { ReducerMethods } from "./reducer.methods";
import { normalizeReqBody } from "../functions/http.functions";

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
    private _wrapper: ReturnType<typeof createWrapper>;

    constructor(ctx: IContextContainer) {
        super(ctx);
        this.rootSaga = this.rootSaga.bind(this);
        this._sagas = BaseService.sagas(ctx);
        this._wrapper = {} as any;
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

    public get wrapper() {
        return this._wrapper;
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
        this._wrapper = createWrapper<EnhancedStore<any, AnyAction>>(() => store);
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
        this._wrapper = createWrapper<EnhancedStore<any, AnyAction>>(() => store, {
            debug: true,
        });
        return store;
    };

    public getServerSideProps(
        apiContainer: AwilixContainer,
        routePath: string,
        controllerName: string | string[],
        serviceName: string | string[],
    ) {
        return this._wrapper.getServerSideProps(
          (store) => async (context: any) => {
            const controllerNames = Array.isArray(controllerName) ? controllerName : [controllerName];
            const servicesNames = Array.isArray(serviceName) ? serviceName : [serviceName];
            let actions: { type: string, payload: Object }[] = []
            for (let i = 0; i < controllerNames.length; ++i) {
                const controller = apiContainer.resolve(controllerNames[i]) as BaseController;
                const res: any = await controller.handlerSSR({ ...context, routePath });
                if (!res || !res.props || !res.props.data) continue;
                
                const service = this.di[servicesNames[i] as keyof typeof this.di] as BaseService;
                const acts = normalizeReqBody(
                    res.props.data, 
                    service.entityName, 
                    service.entitySchema, 
                    ReducerMethods.UPDATE
                );
                actions.push(...acts);
            }
            actions.forEach(action => {
                store.dispatch(action);
            });
            return { props: { data: { } } };
        });
    }
}