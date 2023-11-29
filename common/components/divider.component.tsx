import clsx from "clsx";
import { FC } from "react";

interface IProps {
    className?: string;
    text?: string;
}

export const Divider: FC<IProps> = ({
    className,
    text
}) => (
    <div className={clsx("w-full flex items-center justify-between h-6", {
        'gap-8': text
    }, className)}>
        <div className="border w-full border-indigo-100"></div>
        {text && (
            <span className="text-gray-400 flex-shrink-0">
                {text}
            </span>
        )}
        <div className="border w-full border-indigo-100"></div>
    </div>
)