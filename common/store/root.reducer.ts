import { combineReducers } from "redux";
import { propertyReducer } from "./property/property.reducer";
import { PropertyState } from "./property/property.state.interface";
import { userReducer } from "./user/user.reducer";
import { UserState } from "./user/user.state.interface";

interface IRootReducer {
    propertyReducer: PropertyState;
    userReducer: UserState;
}

export const rootReducer = combineReducers({
    propertyReducer,
    userReducer
});

export type RootState = IRootReducer;