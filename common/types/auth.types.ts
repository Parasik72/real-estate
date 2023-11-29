export enum AuthTypeForm {
    SIGN_IN,
    SIGN_UP
};

export interface SignInVariablesForm {
    email: string;
    password: string;
}

export interface SignUpVariablesForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignInActionForm<T> {
    variables: T;
    validate: (values: T) => void | object;
    type: AuthTypeForm.SIGN_IN;
}

export interface SignUpActionForm<T> {
    variables: T;
    validate: (values: T) => void | object;
    type: AuthTypeForm.SIGN_UP;
}

export type AuthVariableTypes = SignInVariablesForm | SignUpVariablesForm;

export type AuthActionsForm<T extends AuthVariableTypes> = SignInActionForm<T> | SignUpActionForm<T>;