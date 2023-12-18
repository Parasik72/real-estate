import { AuthForm } from "@/common/components/form/auth-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { signUpInitialDataForm } from "@/common/functions/auth.functions";
import { AuthUserEffectActions } from "@/common/services/auth-user/auth-user.service";
import { SignUpVariablesForm } from "@/common/types/auth.types";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IDispatch {
  signUp: (data: {
        values: SignUpVariablesForm
    }) => {
      type: AuthUserEffectActions.SIGN_UP;
  }
}
 
const mapDispatchToProps = (dispatch: Dispatch<Action<AuthUserEffectActions>>): IDispatch => {
  return {
    signUp: (data: {
        values: SignUpVariablesForm
    }) => dispatch({ type: AuthUserEffectActions.SIGN_UP, payload: data })
  }
}

function SignUp({ signUp }: IDispatch) {
    const onSubmit = (values: SignUpVariablesForm) => {
        signUp({
            values: {...values, phone: values.phone.toString()}
        });
    };
    return (
        <PageWrapper className="py-8 h-full">
            <PageContainer className="h-full">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="rounded-md shadow-md bg-indigo-50 max-w-xl w-full">
                        <h2 className="p-8 w-full text-center border-b-2 border-indigo-100 text-dark-blue font-bold text-3xl">
                            Sign up
                        </h2>
                        <AuthForm data={signUpInitialDataForm(onSubmit)} />
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    );
}

export default connect(null, mapDispatchToProps)(SignUp);