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
import { filtersReducer } from "./filters/filters.reducer";
import { Filters } from "./filters/filters.enum";

export interface IRootReducer {
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
    }
    filters: {
        [Filters.AllOffersFilter]: Entity<string>
    };
    authUser: AuthUserState;
}

const mainReducers = combineReducers({
    entities: entitiesReducer,
    paginations: paginationsReducer,
    authUser: authUserReducer,
    filters: filtersReducer
});

let initialState = {}

const compareKeys = ['entities', 'paginations'];

const compareState = (state: any) => {
    // console.log('hydration 1')
    // const stateKeys = Object.keys(state);
    // for (const stateKey of stateKeys) {
    //     if (compareKeys.includes(stateKey) && Object.keys(state[stateKey]).length > 0) {
    //         return false;
    //     }
    // } 
    return true;
}

export const rootReducer = (state = initialState, action: any) => {
    // console.log('hydration start')
    if (action.type === HYDRATE && compareState(state)) {
        // console.log('hydration 2')
        return nextReducer(state, action);
    }
    return mainReducers(state, action);
};

export type RootState = IRootReducer;