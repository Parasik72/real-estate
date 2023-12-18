import { ProfileForm } from "@/common/components/form/profile-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { editProfileInitialDataForm } from "@/common/functions/user.functions";
import { UserModel } from "@/common/services/user/user.model";
import { UserEffectActions } from "@/common/services/user/user.service";
import { RootState } from "@/common/store/root.reducer";
import { Entity } from "@/common/store/types/store.types";
import { AuthUser } from "@/common/types/auth.types";
import { EditProfileVariablesForm } from "@/common/types/profile.type";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IState {
    users: Entity<UserModel>;
    authUser: AuthUser;
}
  
function mapStateToProps(state: RootState): IState {
  return { 
    users: state.entities.users,
    authUser: state.authUser
  }
}

interface IDispatch {
    getProfile: (userId: string) => {
        type: UserEffectActions;
        payload: string;
    };
    editProfile: (values: EditProfileVariablesForm) => {
        type: UserEffectActions.EDIT_PROFILE;
        payload: {
            values: EditProfileVariablesForm;
        };
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<UserEffectActions>>): IDispatch => {
  return {
    getProfile: (userId: string) => 
        dispatch({ type: UserEffectActions.GET_USER_PROFILE, payload: userId }),
    editProfile: (
        values: EditProfileVariablesForm
    ) =>
        dispatch({ type: UserEffectActions.EDIT_PROFILE, payload: { values } }),    
  }
}

function EditProfile({ authUser, users, getProfile, editProfile }: IState & IDispatch) {
    const onSubmit = (values: EditProfileVariablesForm) => {
        editProfile(values);
    }
    useEffect(() => {
        if (!authUser.userId) return;
        getProfile(authUser.userId);
    }, [authUser.userId]);
    const user = users[authUser?.userId || ''];
    if (!user) return <div>Loading...</div>
    return (
        <PageWrapper className="py-8 h-full">
            <PageContainer className="h-full">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="rounded-md shadow-md bg-indigo-50 max-w-xl w-full">
                        <h2 className="p-8 w-full text-center border-b-2 border-indigo-100 text-dark-blue font-bold text-3xl">
                            Edit the personal info
                        </h2>
                        <ProfileForm data={editProfileInitialDataForm(user, onSubmit)} />
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);