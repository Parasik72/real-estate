import clsx from "clsx";
import { ErrorMessage, Field } from "formik";
import { FC } from "react";

interface IProps {
    type: string;
    name: string;
    title: string;
    id?: string;
    placeholder?: string;
    className?: string;
}

export const FormikInput: FC<IProps> = ({ 
    placeholder, className, type, name, id, title
}) => (
    <div className="h-full">
        <label htmlFor={name} className="pl-1 text-lg">{title}</label>
        <div>
            <Field
                id={id}
                name={name}
                placeholder={placeholder} 
                className={clsx("py-4 w-full h-full border-gray-300 rounded-md", className)} 
                type={type}
            />
            <div className="text-red-900">
                <ErrorMessage name={name} />
            </div>
        </div>
    </div>
);
