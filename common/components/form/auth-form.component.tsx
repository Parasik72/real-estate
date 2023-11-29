import { AuthTypeForm } from "@/common/types/auth.types";
import { Input } from "./input.component"
import { FC } from "react";
import { Divider } from "../divider.component";

interface IProps {
    type: AuthTypeForm;
}

export const AuthForm: FC<IProps> = ({ type }) => {
    return (
        <form action="">
            <div className="p-4 flex flex-col gap-4">
                <div className="h-full">
                    <label htmlFor="email" className="pl-1 text-lg">Email</label>
                    <Input id="email" disableQuery name="email" placeholder="Email" type="text" />
                </div>
                <div className="h-full">
                    <label htmlFor="password" className="pl-1 text-lg">Password</label>
                    <Input id="password" disableQuery name="password" placeholder="Password" type="text" />
                </div>
                {type === AuthTypeForm.SIGN_UP && (
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
            </div>
        </form>
    )
}