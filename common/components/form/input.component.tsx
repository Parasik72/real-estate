import clsx from "clsx";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Paginations } from "@/common/store/paginations/paginations.enum";
import { ReducerMethods } from "@/common/store/reducer.methods";

interface IProps {
    type: 'text' | 'number' | 'select';
    name: string;
    id?: string;
    title?: string;
    placeholder?: string;
    className?: string;
    paginationName?: Paginations;
    children?: React.ReactNode;
}

export const Input: FC<IProps> = ({ 
    placeholder, className, type, name, id, title, paginationName, children
}) => {
    const [timeHandler, setTimeHandler] = useState<NodeJS.Timeout | null>(null);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const handleSearch = (term: string) => {
        setValue(term);
        if (!paginationName) return;
        if (timeHandler) clearTimeout(timeHandler);
        const handler = setTimeout(() => {
            const query = { key: name, value: term };
            const payload = {
                entities: { [paginationName]: { query } }
            };
            dispatch({ type: ReducerMethods.UPDATE, payload });
        }, 300);
        setTimeHandler(handler);
    };
    if (type === 'select') {
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
    return (
        <input
            id={id}
            placeholder={placeholder} 
            className={clsx("py-4 w-full h-full border-gray-300 rounded-md", className)} 
            type={type}
            onChange={event => handleSearch(event.target.value)}
            value={value}
        />
    );
}