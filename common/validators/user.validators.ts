import { phoneRegExp } from "../constants/reg-expretions.constants";
import { EditProfileVariablesForm } from "../types/profile.type";
import * as Yup from 'yup';

export const editProfileSchemaForm = Yup.object<EditProfileVariablesForm>().shape({
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