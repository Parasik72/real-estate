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
    private _store: any;
    private _sagas: ReturnType<typeof BaseService.sagas>;
    private _wrapper: ReturnType<typeof createWrapper>;
    private _reducers: { [reducerName: string]: any };

    constructor(ctx: IContextContainer) {
        super(ctx);
        this.rootSaga = this.rootSaga.bind(this);
        this._reducers = BaseService.reducers(ctx);
        this._sagas = BaseService.sagas(ctx);
        this._wrapper = {} as any;
        this._wrapper = this.configureDevStore();
    }

    private *rootSaga() {
        yield all(this._sagas);
    }

    private configureProdStore() {
        const sagaMiddleware = createSagaMiddleware();
        const store = configureStore({
            reducer: rootReducer(this._reducers),
            middleware: (getDefaultMiddleware): any =>
                getDefaultMiddleware({ serializableCheck: false }).concat([sagaMiddleware]),
        });
        sagaMiddleware.run(this.rootSaga);
        this._wrapper = createWrapper<EnhancedStore<any, AnyAction>>(() => store);
        return store;
    }

    private configureDevStore = () => {
        const makeStore = () => {
            const middleware: any[] = [];
            const enhancers: any[] = [];
    
            const sagaMiddleware = createSagaMiddleware();
            middleware.push(sagaMiddleware);
    
            const composeEnhancers = (typeof window == "object" &&
                (window as any)["REDUX_DEVTOOLS_EXTENSION_COMPOSE"]) ||
                compose;
            enhancers.push(applyMiddleware(...middleware));
            const enhancer = composeEnhancers(...enhancers);
            const store = configureStore({
                reducer: rootReducer(this._reducers),
                middleware: (getDefaultMiddleware): any =>
                    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
                // enhancers: enhancer
            });
    
            (store as any).sagaTask = sagaMiddleware.run(this.rootSaga);
            this._store = store;
            return store;
        }
        
        this._wrapper = createWrapper<EnhancedStore<any, AnyAction>>(makeStore, {
            debug: false,
        });
        return this._wrapper;
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
        if (!this._store) return [];
        const state = this._store.getState();
        const pager = state[paginationName];
        if (!pager || !pager.currentPage || !pager.pages) return [];
        const entities: Object[] = [];
        for (let i = 1; i <= pager?.currentPage ?? 0; ++i) {
            pager.pages[i].ids.forEach((entityId: string) => {
                const entity = state[entityName][entityId] as Object;
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