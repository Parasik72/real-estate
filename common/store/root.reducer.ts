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
    }
    authUser: AuthUserState;
}

const mainReducers = (state: any, action: any) => {
    return {
        entities: entitiesReducer(state.entities, action),
        paginations: paginationsReducer(state.paginations, action),
        authUser: authUserReducer(state.authUser, action),
    }
}

let initialState = {}

export const rootReducer = (state = initialState, action: any) => {
    if (action.type === HYDRATE) {
        return nextReducer(state, action);
    }
    return mainReducers(state, action);
};

export type RootState = IRootReducer;