import { AuthActionsForm, AuthTypeForm, AuthVariableTypes } from "@/common/types/auth.types";
import { Divider } from "../divider.component";
import { Form, Formik } from "formik";
import { FormikInput } from "./formik-input.component";

interface IProps<T extends AuthVariableTypes> {
    data: AuthActionsForm<T>;
}

export function AuthForm<T extends AuthVariableTypes>({ data }: IProps<T>) {
    return (
        <Formik initialValues={data.variables} onSubmit={data.onSubmit} validationSchema={data.validationSchema}>
            <Form className="p-4 flex flex-col gap-4">
                <FormikInput title="Email" id="email" name="email" placeholder="Email" type="text" />
                <FormikInput title="Password" id="password" name="password" placeholder="Password" type="password" />
                {data.type === AuthTypeForm.SIGN_UP && (
                    <>
                        <FormikInput title="Confirm password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" type="password" />
                        <Divider text="Personal info" />
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <FormikInput title="First name" id="firstName" name="firstName" placeholder="First name" type="text" />
                            <FormikInput title="Last name" id="lastName" name="lastName" placeholder="Last name" type="text" />
                        </div>
                        <FormikInput title="Phone" id="phone" name="phone" placeholder="Phone" type="number" />
                    </>
                )}
                <Divider />
                <button type="submit" className="py-4 w-full bg-blue-900 text-white rounded-md font-bold">Submit</button>
            </Form>
        </Formik>
    );
}