import { UserModel } from "../services/user/user.model";
import { EditProfileVariablesForm, ProfileActionsForm, ProfileTypeForm } from "../types/profile.type";
import { editProfileSchemaForm } from "../validators/user.validators";

const editProfileInitialVariablesForm = (user: UserModel): EditProfileVariablesForm => ({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone
});

export const editProfileInitialDataForm = (
    user: UserModel,
    onSubmit: (values: EditProfileVariablesForm) => void
): ProfileActionsForm<EditProfileVariablesForm> => ({
    type: ProfileTypeForm.EDIT_PERSONAL_INFO,
    variables: editProfileInitialVariablesForm(user),
    validationSchema: editProfileSchemaForm,
    onSubmit
});