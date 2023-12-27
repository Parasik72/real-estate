import { HttpService } from "../http.service";
import action from "@/common/decorators/action.decorator";
import { put } from "redux-saga/effects";
import { ToastifyMethods } from "@/common/store/toastify/toastify.methods";
import type { ToastifyAction } from "@/common/store/toastify/toastify.types";
import reducer, { InitSchemaReducer } from "@/common/decorators/reducer.decorator";
import { Entities } from "@/common/store/entities/entities.enum";
import { toastifyReducer } from "@/common/store/toastify/toastify.reducer";

const initSchema: InitSchemaReducer = {
    definitions: {},
    options: {}
}

@reducer({
    entityName: Entities.Toastify,
    reducerFunc: toastifyReducer,
    initSchema
})
export class ToastifyService extends HttpService {
    @action()
    public *addToastify(payload: ToastifyAction) {
        yield put({
            type: ToastifyMethods.UPDATE,
            payload
        });
        setTimeout(() => {
            this.di.reduxStore.dispatch({
                type: ToastifyMethods.DELETE,
                payload
            });
        }, 5000);
    }
}