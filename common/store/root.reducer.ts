import { combineReducers } from "redux";
import { propertyReducer } from "./property/property.reducer";
import { PropertyState } from "./property/property.state.interface";
import { userReducer } from "./user/user.reducer";
import { UserState } from "./user/user.state.interface";
import { DealState } from "./deal/deal.state.interface";
import { dealReducer } from "./deal/deal.reducer";

interface IRootReducer {
    propertyReducer: PropertyState;
    userReducer: UserState;
    dealReducer: DealState;
}

export const rootReducer = combineReducers({
    propertyReducer,
    userReducer,
    dealReducer
});

export type RootState = IRootReducer;