import { AuthActionsForm, AuthTypeForm, SignInVariablesForm, SignUpVariablesForm } from "../types/auth.types";
import { signInSchemaForm, signUpSchemaForm } from "../validators/auth.validators";

const signInInitialVariablesForm = (): SignInVariablesForm => ({
    email: '',
    password: ''
});

const signUpInitialVariablesForm = (): SignUpVariablesForm => ({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
});

export const signInInitialDataForm = (
    onSubmit: (values: SignInVariablesForm) => void
): AuthActionsForm<SignInVariablesForm> => ({
    type: AuthTypeForm.SIGN_IN,
    variables: signInInitialVariablesForm(),
    validationSchema: signInSchemaForm,
    onSubmit
});

export const signUpInitialDataForm = (
    onSubmit: (values: SignUpVariablesForm) => void
): AuthActionsForm<SignUpVariablesForm> => ({
    type: AuthTypeForm.SIGN_UP,
    variables: signUpInitialVariablesForm(),
    validationSchema: signUpSchemaForm,
    onSubmit
});