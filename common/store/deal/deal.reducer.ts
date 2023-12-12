import { DealAction, DealActions } from "./deal.action.interface";
import { DealState } from "./deal.state.interface";

const defaultState: DealState = {
    entities: {
        deals: {
            byId: {},
            allIds: []
        }
    }
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
            default: return state;
        }
    }