import { Divider } from "../divider.component";
import { ProfileActionsForm, ProfileVariableTypes } from "@/common/types/profile.type";
import { Form, Formik } from "formik";
import { FormikInput } from "./formik-input.component";

interface IProps<T extends ProfileVariableTypes> {
    data: ProfileActionsForm<T>;
}

export function ProfileForm<T extends ProfileVariableTypes>({ data }: IProps<T>) {
    return (
        <Formik initialValues={data.variables} onSubmit={data.onSubmit} validationSchema={data.validationSchema}>
            <Form className="p-4 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <FormikInput title="First name" id="firstName" name="firstName" placeholder="First name" type="text" />
                    <FormikInput title="Last name" id="lastName" name="lastName" placeholder="Last name" type="text" />
                </div>
                <FormikInput title="Phone" id="phone" name="phone" placeholder="Phone" type="text" />
                <Divider />
                <button className="py-4 w-full bg-blue-900 text-white rounded-md font-bold">Submit</button>
            </Form>
        </Formik>
    );
}