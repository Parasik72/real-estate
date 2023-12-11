import * as Yup from 'yup';
import { AddPropertyVariablesForm, EditPropertyVariablesForm, PropertyStatuses, PropertyTypes } from '../types/property.type';

export const addPropertySchemaForm = Yup.object<AddPropertyVariablesForm>().shape({
    bedRooms: Yup.number()
        .min(0, 'Minimum zero')
        .required(),
    bathRooms: Yup.number()
        .min(0, 'Minimum zero')
        .required(),
    area: Yup.number()
        .min(1, 'Minimum one')
        .required(),
    priceAmount: Yup.number()
        .min(1, 'Minimum one')
        .required(),
    propertyStatus: Yup.mixed<PropertyStatuses>()
        .oneOf(Object.values(PropertyStatuses))
        .required(),
    propertyType: Yup.mixed<PropertyTypes>()
        .oneOf(Object.values(PropertyTypes))
        .required(),
    title: Yup.string()
        .min(5, 'Too short')
        .max(100, 'Too long')
        .required(),
    description: Yup.string()
        .min(5, 'Too short')
        .max(1000, 'Too long')
        .required(),
    countryName: Yup.string()
        .min(2, 'Too short')
        .max(30, 'Too long')
        .required(),
    cityName: Yup.string()
        .min(2, 'Too short')
        .max(30, 'Too long')
        .required(),
    addressLine1: Yup.string()
        .min(2, 'Too short')
        .max(50, 'Too long')
        .required(),
    addressLine2: Yup.string()
        .min(2, 'Too short')
        .max(50, 'Too long')
        .nullable()
});

export const editPropertySchemaForm = Yup.object<EditPropertyVariablesForm>().shape({
    bedRooms: Yup.number()
        .min(0, 'Minimum zero')
        .optional(),
    bathRooms: Yup.number()
        .min(0, 'Minimum zero')
        .optional(),
    area: Yup.number()
        .min(1, 'Minimum one')
        .optional(),
    priceAmount: Yup.number()
        .min(1, 'Minimum one')
        .optional(),
    propertyStatus: Yup.mixed<PropertyStatuses>()
        .oneOf(Object.values(PropertyStatuses))
        .optional(),
    propertyType: Yup.mixed<PropertyTypes>()
        .oneOf(Object.values(PropertyTypes))
        .optional(),
    title: Yup.string()
        .min(5, 'Too short')
        .max(100, 'Too long')
        .optional(),
    description: Yup.string()
        .min(5, 'Too short')
        .max(1000, 'Too long')
        .optional(),
    countryName: Yup.string()
        .min(2, 'Too short')
        .max(30, 'Too long')
        .optional(),
    cityName: Yup.string()
        .min(2, 'Too short')
        .max(30, 'Too long')
        .optional(),
    addressLine1: Yup.string()
        .min(2, 'Too short')
        .max(50, 'Too long')
        .optional(),
    addressLine2: Yup.string()
        .min(2, 'Too short')
        .max(50, 'Too long')
        .nullable()
        .optional(),
    imgsToDeleteIds: Yup.array()
        .optional()
});