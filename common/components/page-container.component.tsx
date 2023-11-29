import clsx from "clsx";
import React, { FC } from "react"

interface IProps {
    className?: string;
    children?: React.ReactNode;
}

export const PageContainer: FC<IProps> = ({ children, className }) => (
    <div className={clsx("px-4 md:max-w-3xl md:mx-auto xl:px-0 lg:max-w-full xl:max-w-6xl", className)}>
        {children}
    </div>
)