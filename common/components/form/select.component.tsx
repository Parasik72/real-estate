import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react"
import { useRouter as useRoute } from "next/router";

interface IProps {
    id?: string;
    title?: string;
    name: string;
    children?: React.ReactNode;
    className?: string;
}

export const Select: FC<IProps> = ({ 
    children, title, name, className, id
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
        <select
            id={id}
            title={title} 
            name={name} 
            className={clsx("py-4 form-select rounded-md", className)}
            {...((title || router.query[name]) && {
                defaultValue: router.query[name] || title
            })}
            onChange={event => handleSearch(event.target.value)}
        >
            {title && <option value={title} disabled>{title}</option>}
            {children}
        </select>
    )
}