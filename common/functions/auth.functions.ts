import { AuthActionsForm, AuthTypeForm, SignInVariablesForm, SignUpVariablesForm } from "../types/auth.types";
import { signInValidateForm, signUpValidateForm } from "../validators/auth.validators";

const signInInitialVariablesForm = (): SignInVariablesForm => ({
    email: '',
    password: ''
});

const signUpInitialVariablesForm = (): SignUpVariablesForm => ({
    email: '',
    password: '',
    confirmPassword: ''
});

export const signInInitialDataForm = (): AuthActionsForm<SignInVariablesForm> => ({
    type: AuthTypeForm.SIGN_IN,
    variables: signInInitialVariablesForm(),
    validate: signInValidateForm
});

export const signUpInitialDataForm = (): AuthActionsForm<SignUpVariablesForm> => ({
    type: AuthTypeForm.SIGN_UP,
    variables: signUpInitialVariablesForm(),
    validate: signUpValidateForm
});