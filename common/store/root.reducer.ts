import { AuthUserState } from "./auth-user/auth-user.reducer";
import { Entities } from "./entities/entities.enum";
import { Entity } from "./types/store.types";
import { PropertyModel } from "../services/property/property.model";
import { PropertyImageModel } from "../services/property/property-image.model";
import { UserModel } from "../services/user/user.model";
import { DealModel } from "../services/deal/deal.model";
import { Paginations } from "./paginations/paginations.enum";
import { IPagination } from "../types/common.types";
import { nextReducer } from "./next-reducer/next.reducer";
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { ToastifyState } from "./toastify/toastify.reducer";

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
    toastifies: ToastifyState;
}

export const rootReducer = (reducers: any) => {
    const mainReducers = (reducers: any) => combineReducers(reducers);
    const reducer = mainReducers(reducers);
    let initialState = {}
    return (state = initialState, action: any) => {
        if (action.type === HYDRATE) {
            return nextReducer(state, action);
        }
        return reducer(state, action);
    };
}


export type RootState = IRootReducer;