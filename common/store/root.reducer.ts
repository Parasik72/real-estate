import { combineReducers } from "redux";
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

export const rootReducer = combineReducers<IRootReducer>({
    entities: entitiesReducer as any,
    authUser: authUserReducer as any,
    paginations: paginationsReducer as any
});

export type RootState = IRootReducer;