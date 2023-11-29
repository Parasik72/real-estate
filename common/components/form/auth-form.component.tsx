import { AuthActionsForm, AuthTypeForm, AuthVariableTypes } from "@/common/types/auth.types";
import { Input } from "./input.component"
import { Divider } from "../divider.component";
import { Form, Formik } from "formik";
import { FormikInput } from "./formik-input.component";

interface IProps<T extends AuthVariableTypes> {
    data: AuthActionsForm<T>;
}

export function AuthForm<T extends AuthVariableTypes>({ data }: IProps<T>) {
    return (
        <Formik initialValues={data.variables} onSubmit={() => {}} validate={data.validate}>
            <Form className="p-4 flex flex-col gap-4">
                <div className="h-full">
                    <label htmlFor="email" className="pl-1 text-lg">Email</label>
                    <FormikInput id="email" name="email" placeholder="Email" type="text" />
                </div>
                <div className="h-full">
                    <label htmlFor="password" className="pl-1 text-lg">Password</label>
                    <FormikInput id="password" name="password" placeholder="Password" type="text" />
                </div>
                {data.type === AuthTypeForm.SIGN_UP && (
                    <>
                        <div className="h-full">
                            <label htmlFor="confirmPassword" className="pl-1 text-lg">Confirm password</label>
                            <Input id="confirmPassword" disableQuery name="confirmPassword" placeholder="Confirm password" type="text" />
                        </div>
                        <Divider text="Personal info" />
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="h-full">
                                <label htmlFor="firstName" className="pl-1 text-lg">First name</label>
                                <Input id="firstName" disableQuery name="firstName" placeholder="First name" type="text" />
                            </div>
                            <div className="h-full">
                                <label htmlFor="lastName" className="pl-1 text-lg">Last name</label>
                                <Input id="lastName" disableQuery name="lastName" placeholder="Last name" type="text" />
                            </div>
                        </div>
                        <div className="h-full">
                            <label htmlFor="phone" className="pl-1 text-lg">Phone</label>
                            <Input id="phone" disableQuery name="phone" placeholder="Phone" type="text" />
                        </div>
                    </>
                )}
                <Divider />
                <button className="py-4 w-full bg-blue-900 text-white rounded-md font-bold">Submit</button>
            </Form>
        </Formik>
    )
}