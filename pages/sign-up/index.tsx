import { AuthForm } from "@/common/components/form/auth-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { FRONT_PATHS } from "@/common/constants/front-paths.constants";
import { signUpInitialDataForm } from "@/common/functions/auth.functions";
import { UserEffectActions } from "@/common/store/saga-effects/user.saga-effects";
import { SignUpVariablesForm } from "@/common/types/auth.types";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IDispatch {
  signUp: (data: {
        values: SignUpVariablesForm,
        callback: () => void
    }) => {
      type: UserEffectActions.SIGN_UP;
  }
}
 
const mapDispatchToProps = (dispatch: Dispatch<Action<UserEffectActions>>): IDispatch => {
  return {
    signUp: (data: {
        values: SignUpVariablesForm,
        callback: () => void
    }) => dispatch({ type: UserEffectActions.SIGN_UP, payload: data })
  }
}

function SignUp({ signUp }: IDispatch) {
    const router = useRouter();
    const onSubmit = (values: SignUpVariablesForm) => {
        signUp({
            values: {...values, phone: values.phone.toString()},
            callback: () => router.push(FRONT_PATHS.signIn)
        })
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
    )
}

export default connect(null, mapDispatchToProps)(SignUp);