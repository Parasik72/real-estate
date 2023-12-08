import { PropertyAction, PropertyActions } from "./property.action.interface";
import { PropertyState } from "./property.state.interface";

const defaultState: PropertyState = {
    entities: {
        properties: {}
    }
};

export const propertyReducer = 
    (state = defaultState, action: PropertyAction): PropertyState => {
        switch(action.type) {
            case PropertyActions.SET_PROPERTIES:
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        properties: action.payload
                    }
                }
            case PropertyActions.ADD_PROPERTY: {
                const property = action.payload;
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        properties: {
                            ...state.entities.properties,
                            [property.propertyId]: property
                        }
                    }
                }
            }
            default: return state;
        }
    }