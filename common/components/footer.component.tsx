import { LogoIcon } from "../icons/logo.icon";

export const Footer = () => (
    <footer className="py-12 flex gap-1 flex-col justify-center items-center bg-blue-900">
        <LogoIcon className="fill-current text-white" />
        <h3 className="text-white font-bold text-xl">Real Estate</h3>
    </footer>
)