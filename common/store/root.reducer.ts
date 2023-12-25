import { entitiesReducer } from "./entities/entities.reducer";
import { AuthUserState, authUserReducer } from "./auth-user/auth-user.reducer";
import { Entities } from "./entities/entities.enum";
import { Entity } from "./types/store.types";
import { PropertyModel } from "../services/property/property.model";
import { PropertyImageModel } from "../services/property/property-image.model";
import { UserModel } from "../services/user/user.model";
import { DealModel } from "../services/deal/deal.model";
import { paginationsReducer } from "./paginations/paginations.reducer";
import { Paginations } from "./paginations/paginations.enum";
import { IPagination } from "../types/common.types";
import { nextReducer } from "./next-reducer/next.reducer";
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { ToastifyState, toastifyReducer } from "./toastify/toastify.reducer";

export interface IRootReducer {
    [Entities.Property]: Entity<PropertyModel>,
    [Entities.PropertyImage]: Entity<PropertyImageModel>,
    [Entities.User]: Entity<UserModel>,
    [Entities.Deal]: Entity<DealModel>,
    [Paginations.AllOffersPage]: IPagination;
    [Paginations.MySuccessfulDealsPage]: IPagination;
    [Paginations.RequestedByMeDealsPage]: IPagination;
    [Paginations.RequestedForMeDealsPage]: IPagination;
    [Paginations.UserPropertiesPage]: IPagination;
    authUser: AuthUserState;
    toastify: ToastifyState;
}

let reducers: any = {
    authUser: authUserReducer,
    toastify: toastifyReducer
};

Object.values(Entities).forEach((entityName) => {
    reducers[entityName] = (state: any, action: any) => entitiesReducer(state, action, entityName)
});

Object.values(Paginations).forEach((entityName) => {
    reducers[entityName] = (state: any, action: any) => paginationsReducer(state, action, entityName)
});

const mainReducers = combineReducers(reducers);

let initialState = {}

export const rootReducer = (state = initialState, action: any) => {
    if (action.type === HYDRATE) {
        return nextReducer(state, action);
    }
    return mainReducers(state, action);
};

export type RootState = IRootReducer;