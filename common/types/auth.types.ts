import { DataForm } from "./form.type";

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
    firstName: string;
    lastName: string;
    phone: string;
}

export interface SignInActionForm<T extends Object> extends DataForm<T> {
    type: AuthTypeForm.SIGN_IN;
}

export interface SignUpActionForm<T extends Object> extends DataForm<T>  {
    type: AuthTypeForm.SIGN_UP;
}

export type AuthVariableTypes = SignInVariablesForm | SignUpVariablesForm;

export type AuthActionsForm<T extends AuthVariableTypes> = SignInActionForm<T> | SignUpActionForm<T>;

export interface AuthUser {
    isAuth: boolean;
    userId?: string;
}