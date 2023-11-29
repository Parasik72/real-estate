import clsx from "clsx";
import { FC } from "react";

interface IProps {
    name: string;
    id?: string;
    placeholder?: string;
    className?: string;
}

export const Textarea: FC<IProps> = ({
    name,
    className,
    id,
    placeholder
}) => {
    return (
        <textarea
            name={name}
            id={id}
            placeholder={placeholder} 
            className={clsx("py-4 w-full h-full border-gray-300 rounded-md", className)} 
        />
    );
}