import { combineReducers } from "redux";
import { propertyReducer } from "./property/property.reducer";
import { PropertyState } from "./property/property.state.interface";
import { userReducer } from "./user/user.reducer";
import { UserState } from "./user/user.state.interface";
import { DealState } from "./deal/deal.state.interface";
import { dealReducer } from "./deal/deal.reducer";
import { EntitiesState, entitiesReducer } from "./entities.reducer";
import { Entities } from "./entities.enum";

interface IRootReducer {
    propertyReducer: PropertyState;
    userReducer: UserState;
    dealReducer: DealState;
    entities: EntitiesState;
}

const initialState = {
    properties: {},
    propertyImages: {},
    users: {},
    deals: {},
}

export const rootReducer = combineReducers({
    propertyReducer,
    userReducer,
    dealReducer,
    aPropertyReducer: (state = initialState, action: any) =>
        entitiesReducer(state, action, Entities.Property),
    aPropertyImageReducer: (state = initialState, action: any) =>
        entitiesReducer(state, action, Entities.PropertyImage),
});

export type RootState = IRootReducer;