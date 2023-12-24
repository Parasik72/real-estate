import { AnyAction, Dispatch, Store, applyMiddleware, compose } from "redux";
import BaseContext from "../context/base-context";
import IContextContainer from "../context/icontext-container";
import { Paginations } from "./paginations/paginations.enum";
import { BaseService } from "../services/base.service";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { IRootReducer, rootReducer } from "./root.reducer";
import { createWrapper } from "next-redux-wrapper";
import { AwilixContainer } from "awilix";
import { BaseController } from "@/server/controllers/base-controller";
import { ReducerMethods } from "./reducer.methods";
import { Entities } from "./entities/entities.enum";

interface SSRConfig {
    routePath: string;
    apiControllerName: string;
    serviceName: string;
    query?: Record<string, string>;
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
            ? (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
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

    public getEntityPage<T extends Object>(
        paginationName: Paginations,
        entityName: Entities
    ): T[] {
        const state = this._store.getState();
        const pager = state.paginations[paginationName];
        if (!pager) return [];
        const entities: Object[] = [];
        for (let i = 1; i <= pager.currentPage; ++i) {
            pager.pages[i].ids.forEach((entityId) => {
                const entity = state.entities[entityName][entityId] as Object;
                entities.push(entity)
            });
        }
        return entities as T[];
    }

    public getServerSideProps(
        apiContainer: AwilixContainer,
        configs: SSRConfig[],
    ) {
        return this._wrapper.getServerSideProps(
          (store) => async (context: any) => {
            let actions: { type: string, payload: Object }[] = [];
            for (const config of configs) {
                const controller = apiContainer.resolve(config.apiControllerName) as BaseController;
                const query = { ...context.query, ...config.query };
                const res: any = await controller.handlerSSR({ 
                    ...context, routePath: config.routePath, query
                });
                if (!res || !res.props || !res.props.data) continue;
                
                const service = this.di[config.serviceName as keyof typeof this.di] as BaseService;
                const acttion = service.normalizeReqBody(res.props.data, ReducerMethods.UPDATE);
                actions.push(acttion);
            }
            actions.forEach(action => store.dispatch(action));
            return { props: { data: { } } };
        });
    }
}