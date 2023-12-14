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

export const rootReducer = combineReducers({
    propertyReducer,
    userReducer,
    dealReducer,
    aPropertyReducer: (state = { }, action: any) =>
        entitiesReducer(state, action, Entities.Property),
    // entities: entitiesReducer
});

export type RootState = IRootReducer;