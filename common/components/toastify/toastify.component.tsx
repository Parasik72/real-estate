import { CrossIcon } from "@/common/icons/cross.icon";
import { UserEffectActions } from "@/common/services/user/user.service";
import { ToastifyMethods } from "@/common/store/toastify/toastify.methods";
import { ToastifyAction, ToastifyStatus } from "@/common/store/toastify/toastify.types";
import clsx from "clsx";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IDispatch {
    removeToastify: (action: ToastifyAction) => {
        type: ToastifyMethods.DELETE;
        payload: ToastifyAction;
    }
}

const mapToDispatchState = (dispatch: Dispatch<Action<ToastifyMethods | UserEffectActions>>): IDispatch => {
    return {
        removeToastify: (action: ToastifyAction) => 
            dispatch({ type: ToastifyMethods.DELETE, payload: action }),
    }
}

interface IProps {
    action: ToastifyAction;
}

function ToastifyComponent({ action, removeToastify }: IProps & IDispatch) {
    const onClose = () => {
        removeToastify(action);
    }

    return (
        <div className={clsx("relative z-50 p-4 rounded-md w-full flex justify-between items-center gap-2", {
            'bg-red-900': action.status === ToastifyStatus.Error,
            'bg-green-900': action.status === ToastifyStatus.Success,
        })}>
            <span className="text-white font-bold">{ action.message }</span>
            <button onClick={onClose}>
                <CrossIcon />
            </button>
        </div>
    );
};

export const Toastify = connect(null, mapToDispatchState)(ToastifyComponent);