import { PropertyAction, PropertyActions } from "./property.action.interface";
import { PropertyState } from "./property.state.interface";

const defaultState: PropertyState = {
    offers: [],
    lastOffers: [],
    property: undefined
};

export const propertyReducer = 
    (state = defaultState, action: PropertyAction): PropertyState => {
        switch(action.type) {
            case PropertyActions.SET_OFFERS:
                return {
                    ...state,
                    offers: action.payload
                }
            case PropertyActions.SET_LAST_OFFERS:
                return {
                    ...state,
                    lastOffers: action.payload
                }
            case PropertyActions.SET_PROPERTY:
                return {
                    ...state,
                    property: action.payload
                }
            default: return state;
        }
    }