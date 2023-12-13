import { DealAction, DealActions } from "./deal.action.interface";
import { DealState } from "./deal.state.interface";

const defaultState: DealState = {
    entities: {
        deals: {
            byId: {},
            allIds: []
        }
    },
    paginations: {}
};

export const dealReducer = 
    (state = defaultState, action: DealAction): DealState => {
        switch(action.type) {
            case DealActions.SET_DEALS:
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        deals: action.payload
                    }
                }
            case DealActions.ADD_DEALS: {
                const allIdsSet = new Set([
                    ...state.entities.deals.allIds, 
                    ...action.payload.allIds
                ]);
                const allIds =  Array.from(allIdsSet);
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        deals: {
                            ...state.entities.deals,
                            byId: {
                                ...state.entities.deals.byId,
                                ...action.payload.byId
                            },
                            allIds
                        }
                    }
                }
            }
            case DealActions.SET_REQ_BY_ME_DEALS_PAGE:
                return {
                    ...state,
                    paginations: {
                        ...state.paginations,
                        requestedByMeDeals: action.payload
                    }
                }
            case DealActions.SET_REQ_FOR_ME_DEALS_PAGE:
                return {
                    ...state,
                    paginations: {
                        ...state.paginations,
                        requestedForMeDeals: action.payload
                    }
                }
            case DealActions.SET_MY_SUCCESS_DEALS_PAGE:
                return {
                    ...state,
                    paginations: {
                        ...state.paginations,
                        mySuccessfulDeals: action.payload
                    }
                }
            default: return state;
        }
    }