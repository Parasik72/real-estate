import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { useRouter as useRoute } from "next/router";

interface IProps {
    type: string;
    name: string;
    id?: string;
    placeholder?: string;
    className?: string;
    disableQuery?: boolean;
}

export const Input: FC<IProps> = ({ 
    placeholder, className, type, name, disableQuery, id
}) => {
    const searchParams = useSearchParams();
    const router = useRoute();
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
            id={id}
            placeholder={placeholder} 
            className={clsx("py-4 w-full h-full border-gray-300 rounded-md", className)} 
            type={type}
            onChange={event => !disableQuery && handleSearch(event.target.value)}
            {...(router.query[name] && {defaultValue: router.query[name]})}
        />
    );
}