import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface IProps {
    type: string;
    name: string;
    placeholder?: string;
    className?: string;
}

export const Input: FC<IProps> = ({ 
    placeholder, className, type, name
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) params.set(name, term);
        else params.delete(name);
        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <input 
            placeholder={placeholder} 
            className={clsx("py-4 w-full h-full border-gray-300 rounded-md", className)} 
            type={type}
            onChange={event => handleSearch(event.target.value)}
        />
    );
}