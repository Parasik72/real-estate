import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

interface IProps {
    className?: string;
    displayBrokerLink?: boolean;
    displayEditLink?: boolean;
}

export const UserInfo: FC<IProps> = ({ 
    className, displayBrokerLink, displayEditLink
}) => (
    <div className={clsx("p-4 rounded-sm flex flex-col justify-center items-center gap-5", className)}>
        <div className="flex flex-col justify-center items-center">
            <h3 className="text-dark-blue text-xl font-bold">Haylie Donin</h3>
            <span className="block text-dark-blue">+34 555 781 731</span>
            <span className="block text-dark-blue">haylie.donin@realestate.es</span>
        </div>
        {displayEditLink && (
            <button className="py-4 w-full bg-blue-900 text-white rounded-md font-bold">
                Edit profile
            </button>
        )}
        {displayBrokerLink && (
            <Link className="text-blue-900 underline" href="/profile/1">
                View broker profile
            </Link>
        )}
    </div>
);