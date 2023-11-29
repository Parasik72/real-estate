import clsx from "clsx";
import React, { FC } from "react"

interface IProps {
    className?: string;
    children?: React.ReactNode;
}

export const PageWrapper: FC<IProps> = ({ children, className }) => (
    <div className={clsx("antialiased pt-8 w-full", className)}>
        {children}
    </div>
)