import { FiltersMethods } from "@/common/store/filters/filters.methods";
import clsx from "clsx";
import React, { FC, useState } from "react"
import { useDispatch } from "react-redux";

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
    const [timeHandler, setTimeHandler] = useState<NodeJS.Timeout | null>(null);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const handleSearch = (term: string) => {
        setValue(term);
        if (timeHandler) clearTimeout(timeHandler);
        const handler = setTimeout(() => {
            dispatch({ type: FiltersMethods.UPDATE, payload: {
                key: name,
                value: term
            }});
        }, 300);
        setTimeHandler(handler);
    };
    return (
        <select
            id={id}
            title={title} 
            name={name} 
            className={clsx("py-4 form-select rounded-md", className)}
            value={value.length === 0 ? title : value}
            onChange={event => handleSearch(event.target.value)}
        >
            {title && <option value={title} disabled>{title}</option>}
            {children}
        </select>
    )
}