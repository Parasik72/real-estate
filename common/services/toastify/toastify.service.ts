import IContextContainer from "@/common/context/icontext-container";
import { HttpService } from "../http.service";
import action from "@/common/decorators/action.decorator";
import { put } from "redux-saga/effects";
import { ToastifyMethods } from "@/common/store/toastify/toastify.methods";
import type { ToastifyAction } from "@/common/store/toastify/toastify.types";

export class ToastifyService extends HttpService {
    constructor(ctx: IContextContainer) {
        super(ctx);
        this.initSchema('toastify');
    }

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