import * as Yup from 'yup';

export interface DataForm<T extends Object> {
    variables: T;
    validationSchema: Yup.ObjectSchema<T, T>;
    onSubmit: (values: T) => void;
}