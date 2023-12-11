import { 
    AddPropertyVariablesForm, 
    PropertyActionsForm, 
    PropertyStatuses, 
    PropertyTypeForm, 
    PropertyTypes 
} from "../types/property.type";
import { addPropertySchemaForm } from "../validators/property.validators";

const getArticle = (word: string) => /^[aeiouy]/.test(word.toLowerCase()) ? 'an' : 'a';

export const getPropertyTypeNameWithArticle = (propertyType: string) => {
    return `${getArticle(propertyType)} ${propertyType}`;
}

const addPropertyInit = (): AddPropertyVariablesForm => ({
    addressLine1: '',
    addressLine2: '',
    area: 0,
    bathRooms: 0,
    bedRooms: 0,
    cityName: '',
    countryName: '',
    description: '',
    priceAmount: 0,
    propertyStatus: PropertyStatuses.ForSale,
    propertyType: PropertyTypes.House,
    title: ''
});

export const addPropertyInitForm = (
    onSubmit: (values: AddPropertyVariablesForm) => void
): PropertyActionsForm<AddPropertyVariablesForm> => ({
    type: PropertyTypeForm.ADD,
    variables: addPropertyInit(),
    validationSchema: addPropertySchemaForm,
    onSubmit
});