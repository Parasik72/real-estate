import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react"
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
    const [value, setValue] = useState('');
    const { replace } = useRouter();
    const handleSearch = (term: string) => {
        setValue(term);
        const params = new URLSearchParams(searchParams);
        if (term) params.set(name, term);
        else params.delete(name);
        replace(`${pathname}?${params.toString()}`);
    };
    useEffect(() => {
        if (!router.isReady) return;
        setValue(router.query[name] 
            ? router.query[name] as string
            : ''
        );
    }, [router.isReady]);
    return (
        <select
            id={id}
            title={title} 
            name={name} 
            className={clsx("py-4 form-select rounded-md", className)}
            value={value}
            onChange={event => handleSearch(event.target.value)}
        >
            {title && <option value={title} disabled>{title}</option>}
            {children}
        </select>
    )
}