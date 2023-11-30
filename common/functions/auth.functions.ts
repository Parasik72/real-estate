import { userService } from "../services/user/user.service";
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

export const signInInitialDataForm = (): AuthActionsForm<SignInVariablesForm> => ({
    type: AuthTypeForm.SIGN_IN,
    variables: signInInitialVariablesForm(),
    validationSchema: signInSchemaForm,
    onSubmit: userService.signIn.bind(userService)
});

export const signUpInitialDataForm = (): AuthActionsForm<SignUpVariablesForm> => ({
    type: AuthTypeForm.SIGN_UP,
    variables: signUpInitialVariablesForm(),
    validationSchema: signUpSchemaForm,
    onSubmit: userService.signIn.bind(userService)
});