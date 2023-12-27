import { RootState } from "@/common/store/root.reducer";
import { ToastifyState } from "@/common/store/toastify/toastify.reducer";
import { connect } from "react-redux";
import { Toastify } from "./toastify.component";

interface IState {
    toastifies: ToastifyState;
}

const mapToPropsState = (state: RootState): IState => {
    return {
        toastifies: state.toastifies
    }
}

function ToastifyContainer({ toastifies }: IState) {
    if (!toastifies) return <></>;
    return (
        <div className="absolute top-0 left-0 w-full flex justify-center">
            <div className="p-4 flex flex-col gap-5 w-full max-w-full md:max-w-xs flex-shrink-0">
                {toastifies.actions.map((action) => <Toastify key={action.id} action={action} />)}
            </div>
        </div>
    );
};

export default connect(mapToPropsState, null)(ToastifyContainer);