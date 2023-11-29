import clsx from "clsx";
import React, { FC } from "react"

interface IProps {
    id?: string;
    title?: string;
    name?: string;
    children?: React.ReactNode;
    className?: string;
}

export const Select: FC<IProps> = ({ 
    children, title, name, className, id
}) => (
    <select
        id={id}
        title={title} 
        name={name} 
        className={clsx("py-4 form-select rounded-md", className)}
    >
        {children}
    </select>
)