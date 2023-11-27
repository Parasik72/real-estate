import React from "react"
import { Navbar } from "./navbar.component";

interface IProps {
    children?: React.ReactNode;
}

export default function Layout({ children }: IProps) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}