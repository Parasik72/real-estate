import clsx from "clsx";
import { ErrorMessage, Field } from "formik";
import { FC } from "react";

interface IProps {
    type: string;
    name: string;
    id?: string;
    placeholder?: string;
    className?: string;
}

export const FormikInput: FC<IProps> = ({ 
    placeholder, className, type, name, id
}) => (
    <div>
        <Field
            id={id}
            name={name}
            placeholder={placeholder} 
            className={clsx("py-4 w-full h-full border-gray-300 rounded-md", className)} 
            type={type}
        />
        <ErrorMessage name={name} />
    </div>
);
