import { SignInVariablesForm, SignUpVariablesForm } from "../types/auth.types";
import * as Yup from 'yup';
 
export const signInSchemaForm = Yup.object<SignInVariablesForm>().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too short')
    .max(50, 'Too long')
    .required('Required')
});

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const signUpSchemaForm = Yup.object<SignUpVariablesForm>().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  confirmPassword: Yup.string()
    .min(6, 'Too short')
    .max(50, 'Too long')
    .oneOf([Yup.ref('password')], "Must be equal to password")
    .required('Required'),
  firstName: Yup.string()
    .min(2, 'Too short')
    .max(30, 'Too long')
    .matches(/^[A-Z][a-z]*$/, 'Invalid first name')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .max(30, 'Too long')
    .matches(/^[A-Z][a-z]*$/, 'Invalid last name')
    .required('Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Incorrect phone number')
    .min(9, 'Too short')
    .max(12, 'Too long')
    .required('Required'),
});