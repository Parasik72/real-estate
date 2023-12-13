import { PropertyAction, PropertyActions } from "./property.action.interface";
import { PropertyState } from "./property.state.interface";

const defaultState: PropertyState = {
    entities: {
        properties: {
            byId: {},
            allIds: []
        },
        propertyImages: {
            byId: {},
            allIds: []
        }
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
                            byId: {
                                ...state.entities.properties.byId,
                                [property.propertyId]: property
                            },
                            allIds: [
                                ...state.entities.properties.allIds, 
                                property.propertyId
                            ]
                        }
                    }
                }
            }
            case PropertyActions.SET_PROPERTY_IMAGES:
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        propertyImages: action.payload
                    }
                }
            case PropertyActions.ADD_PROPERTY_IMAGES: {
                const allIdsSet = new Set([
                    ...state.entities.propertyImages.allIds, 
                    ...action.payload.allIds
                ]);
                const allIds =  Array.from(allIdsSet);
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        propertyImages: {
                            ...state.entities.propertyImages,
                            byId: {
                                ...state.entities.propertyImages.byId,
                                ...action.payload.byId
                            },
                            allIds
                        }
                    }
                }
            }
            case PropertyActions.ADD_PROPERTIES: {
                const allIdsSet = new Set([
                    ...state.entities.properties.allIds, 
                    ...action.payload.allIds
                ]);
                const allIds =  Array.from(allIdsSet);
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        properties: {
                            ...state.entities.properties,
                            byId: {
                                ...state.entities.properties.byId,
                                ...action.payload.byId
                            },
                            allIds
                        }
                    }
                }
            }
            default: return state;
        }
    }