import React from "react"

interface IProps {
    children?: React.ReactNode;
}

export default function Layout({ children }: IProps) {
    return (
        <>
            <div>Layout</div>
            <main>{children}</main>
        </>
    )
}