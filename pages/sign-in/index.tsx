import { AuthForm } from "@/common/components/form/auth-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { FRONT_PATHS } from "@/common/constants/front-paths.constants";
import { signInInitialDataForm } from "@/common/functions/auth.functions";
import { AuthUserEffectActions } from "@/common/services/auth-user/auth-user.service";
import { SignInVariablesForm } from "@/common/types/auth.types";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IDispatch {
  signIn: (data: {
        values: SignInVariablesForm,
        callback: () => void
    }) => {
      type: AuthUserEffectActions.SIGN_IN;
  }
}
 
const mapDispatchToProps = (dispatch: Dispatch<Action<AuthUserEffectActions>>): IDispatch => {
  return {
    signIn: (data: {
        values: SignInVariablesForm,
        callback: () => void
    }) => dispatch({ type: AuthUserEffectActions.SIGN_IN, payload: data })
  }
}

function SignIn({ signIn }: IDispatch) {
    const router = useRouter();
    const onSubmit = (values: SignInVariablesForm) => {
        signIn({
            values,
            callback: () => router.push(FRONT_PATHS.home)
        });
    }
    return (
        <PageWrapper className="py-8 h-full">
            <PageContainer className="h-full">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="rounded-md shadow-md bg-indigo-50 max-w-xl w-full">
                        <h2 className="p-8 w-full text-center border-b-2 border-indigo-100 text-dark-blue font-bold text-3xl">
                            Sign in
                        </h2>
                        <AuthForm data={signInInitialDataForm(onSubmit)} />
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    )
}

export default connect(null, mapDispatchToProps)(SignIn);