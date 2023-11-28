import { AuthType } from "@/common/types/auth.types";
import { Input } from "./input.component"
import { FC } from "react";

interface IProps {
    type: AuthType;
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
                {type === AuthType.SIGN_UP && (
                    <>
                        <div className="h-full">
                            <label htmlFor="confirmPassword" className="pl-1 text-lg">Confirm password</label>
                            <Input id="confirmPassword" disableQuery name="confirmPassword" placeholder="Confirm password" type="text" />
                        </div>
                        <div className="w-full flex items-center justify-between gap-8">
                            <div className="border w-full border-indigo-100"></div>
                            <span className="text-gray-400 flex-shrink-0">
                                Personal info
                            </span>
                            <div className="border w-full border-indigo-100"></div>
                        </div>
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
                <button className="py-4 w-full bg-blue-900 text-white rounded-md font-bold">Submit</button>
            </div>
        </form>
    )
}