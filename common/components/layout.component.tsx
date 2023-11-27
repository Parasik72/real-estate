import React from "react"
import { Navbar } from "./navbar.component";

interface IProps {
    children?: React.ReactNode;
}

export default function Layout({ children }: IProps) {
    return (
        <>
            <Navbar />
            <main className="antialiased px-4 py-8 md:max-w-3xl md:mx-auto lg:max-w-none xl:px-0 xl:max-w-6xl">
                {children}
            </main>
        </>
    )
}