import { DataForm } from "./form.type";

export enum ProfileTypeForm {
    EDIT_PERSONAL_INFO
};

export interface EditProfileVariablesForm {
    firstName: string;
    lastName: string;
    phone: string;
}

export interface EditProfileActionForm<T extends ProfileVariableTypes> extends DataForm<T> {
    type: ProfileTypeForm.EDIT_PERSONAL_INFO;
}

export type ProfileVariableTypes = EditProfileVariablesForm;

export type ProfileActionsForm<T extends ProfileVariableTypes> = EditProfileActionForm<T>;