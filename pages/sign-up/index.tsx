import { AuthForm } from "@/common/components/form/auth-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { signUpInitialDataForm } from "@/common/functions/auth.functions";

export default function SignUp() {
    return (
        <PageWrapper className="py-8 h-full">
            <PageContainer className="h-full">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="rounded-md shadow-md bg-indigo-50 max-w-xl w-full">
                        <h2 className="p-8 w-full text-center border-b-2 border-indigo-100 text-dark-blue font-bold text-3xl">
                            Sign up
                        </h2>
                        <AuthForm data={signUpInitialDataForm()} />
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    )
}