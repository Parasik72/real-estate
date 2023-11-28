import { AuthForm } from "@/common/components/form/auth-form.component";
import { AuthType } from "@/common/types/auth.types";

export default function SignUp() {
    return (
        <div className="antialiased w-full h-full">
            <div className="px-4 py-8 h-full md:max-w-3xl md:mx-auto xl:px-0 lg:max-w-full xl:max-w-6xl">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="rounded-md shadow-md bg-indigo-50 max-w-xl w-full">
                        <h2 className="p-8 w-full text-center border-b-2 border-indigo-100 text-dark-blue font-bold text-3xl">
                            Sign up
                        </h2>
                        <AuthForm type={AuthType.SIGN_UP} />
                    </div>
                </div>
            </div>
        </div>
    )
}