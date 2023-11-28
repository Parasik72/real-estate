import React from "react"
import { Navbar } from "./navbar.component";
import { Footer } from "./footer.component";

interface IProps {
    children?: React.ReactNode;
}

export default function Layout({ children }: IProps) {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}