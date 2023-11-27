import Link from "next/link"
import { LogoIcon } from "../icons/logo.icon"
import { HamburgerIcon } from "../icons/hamburder.icon"
import { useState } from "react"
import clsx from "clsx"
import { CrossIcon } from "../icons/cross.icon"

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    return (
        <header className="bg-gray-100 shadow-lg lg:shadow-transparent lg:bg-transparent">
            <div className="px-4 py-8 md:max-w-3xl md:mx-auto lg:max-w-none xl:px-0 xl:max-w-6xl flex justify-between items-center">
                <div className="lg:flex w-full">
                    <div className="w-full lg:w-auto flex justify-between items-center">
                        <div>
                            <LogoIcon className="fill-current text-dark-blue" />
                        </div>
                        <button onClick={toggleMenu} className="lg:hidden">
                            {isMenuOpen ? <CrossIcon /> : <HamburgerIcon />}
                        </button>
                    </div>
                    <nav className={clsx("mt-4 pt-4 w-full border-t border-gray-500 lg:mt-0 lg:pt-0 lg:border-none lg:flex justify-between", {
                        'flex': isMenuOpen,
                        'hidden': !isMenuOpen
                    })}>
                        <div className="flex flex-col md:flex-row md:items-center gap-5 lg:ml-12">
                            <Link href="#topoffers" className="text-gray-800">Last offers</Link>
                            <Link href="#topoffers" className="text-gray-800">Search in offers</Link>
                            <Link href="#topoffers" className="text-gray-800">About us</Link>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                            <Link href="#topoffers" className="px-6 py-2 text-white bg-blue-900 rounded-md font-bold ">Sign In</Link>
                            <Link href="#topoffers" className="px-6 py-2 text-white bg-blue-900 rounded-md font-bold ">Sign Up</Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}