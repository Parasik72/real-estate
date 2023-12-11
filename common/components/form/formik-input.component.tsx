import clsx from "clsx";
import { ErrorMessage, Field } from "formik";
import React, { FC } from "react";

interface IProps {
    type?: string;
    name: string;
    title: string;
    id?: string;
    placeholder?: string;
    className?: string;
    as?: string;
    children?: React.ReactNode;
    optional?: boolean;
}

export const FormikInput: FC<IProps> = ({ 
    placeholder, className, type, name, id, title, as, children, optional
}) => (
    <div className="h-full">
        {as !== 'button' && (
            <label htmlFor={name} className="pl-1 text-lg">
                {title}
                {optional && <span className="font-bold text-red-900">*</span>}
            </label>
        )}
        <div>
            <Field
                id={id}
                name={name}
                placeholder={placeholder} 
                className={clsx("py-4 w-full h-full border-gray-300 rounded-md", className)} 
                type={type}
                as={as}
            >
                {children}
            </Field>
            <div className="text-red-900">
                <ErrorMessage name={name} />
            </div>
        </div>
    </div>
);
