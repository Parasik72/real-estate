import clsx from "clsx";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { FiltersMethods } from "@/common/store/filters/filters.methods";

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
        <input
            id={id}
            placeholder={placeholder} 
            className={clsx("py-4 w-full h-full border-gray-300 rounded-md", className)} 
            type={type}
            onChange={event => !disableQuery && handleSearch(event.target.value)}
            value={value}
        />
    );
}