import { DataForm } from "./form.type";

export enum PropertyTypeForm {
    ADD,
    EDIT
};

export enum PropertyStatuses {
    ForSale='For sale',
    Awaiting='Awaiting',
}

export enum PropertyTypes {
    Any='Any',
    House='House',
    Apartment='Apartment',
    Villa='Villa'
}

export interface AddPropertyVariablesForm {
    bedRooms: number;
    bathRooms: number;
    area: number;
    title: string;
    description: string;
    priceAmount: number;
    countryName: string;
    cityName: string;
    addressLine1: string;
    addressLine2?: string | null;
    propertyStatus: PropertyStatuses;
    propertyType: PropertyTypes;
}

export interface EditPropertyVariablesForm {
    bedRooms?: number;
    bathRooms?: number;
    area?: number;
    title?: string;
    description?: string;
    priceAmount?: number;
    countryName?: string;
    cityName?: string;
    addressLine1?: string;
    addressLine2?: string | null;
    propertyStatus?: PropertyStatuses;
    propertyType?: PropertyTypes;
    imgsToDeleteIds?: string[];
}

export interface AddPropertyActionForm<T extends Object> extends DataForm<T> {
    type: PropertyTypeForm.ADD
}

export interface EditPropertyActionForm<T extends Object> extends DataForm<T> {
    type: PropertyTypeForm.EDIT
}

export type PropertyVariableTypes = AddPropertyVariablesForm | EditPropertyVariablesForm;

export type PropertyActionsForm<T extends PropertyVariableTypes> = AddPropertyActionForm<T> | EditPropertyActionForm<T>;