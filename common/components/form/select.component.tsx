import clsx from "clsx";
import React, { FC } from "react"

interface IProps {
    title?: string;
    name?: string;
    children?: React.ReactNode;
    className?: string;
}

export const Select: FC<IProps> = ({ children, title, name, className }) => (
    <select 
        title={title} 
        name={name} 
        className={clsx("py-4 form-select rounded-md", className)}
    >
        {children}
    </select>
)