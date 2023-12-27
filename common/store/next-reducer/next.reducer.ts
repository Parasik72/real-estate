import { HYDRATE } from "next-redux-wrapper";

export const nextReducer = (state: any, action: any) => {
    switch (action.type) {
        case HYDRATE: {
            const { authUser, toastifies, ...payload } = action.payload;
            return { ...state, ...payload };
        }
        default:
            return state;
    }
};