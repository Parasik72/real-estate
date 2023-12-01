import { FRONT_PATHS } from "@/common/constants/front-paths.constants";
import { UserModel } from "@/common/services/user/user.model";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

interface IProps {
    user: UserModel;
    className?: string;
    displayBrokerLink?: boolean;
    displayEditLink?: boolean;
}

export const UserInfo: FC<IProps> = ({ 
    className, displayBrokerLink, displayEditLink, user
}) => (
    <div className={clsx("p-4 rounded-sm flex flex-col justify-center items-center gap-5", className)}>
        <div className="flex flex-col justify-center items-center">
            <h3 className="text-dark-blue text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h3>
            <span className="block text-dark-blue">{user.phone}</span>
            <span className="block text-dark-blue">{user.email}</span>
        </div>
        {displayEditLink && (
            <Link href={FRONT_PATHS.profileEdit} className="py-4 w-full bg-blue-900 text-white rounded-md font-bold">
                Edit profile
            </Link>
        )}
        {displayBrokerLink && (
            <Link 
                className="text-blue-900 underline" 
                href={FRONT_PATHS.profileById.replace(':userId', user.userId)}
            >
                View broker profile
            </Link>
        )}
    </div>
);