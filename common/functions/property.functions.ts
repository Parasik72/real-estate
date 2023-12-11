import { PropertyModel } from "../services/property/property.model";
import { 
    AddPropertyVariablesForm, 
    EditPropertyVariablesForm, 
    PropertyActionsForm, 
    PropertyStatuses, 
    PropertyTypeForm, 
    PropertyTypes 
} from "../types/property.type";
import { addPropertySchemaForm, editPropertySchemaForm } from "../validators/property.validators";

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

const editPropertyInit = (property: PropertyModel): EditPropertyVariablesForm => ({
    addressLine1: property.PropertyAddress?.addressLine1,
    addressLine2: property.PropertyAddress?.addressLine2 ,
    area: property.area,
    bathRooms: property.bathRooms,
    bedRooms: property.bedRooms,
    cityName: property.PropertyAddress?.cityName,
    countryName: property.PropertyAddress?.countryName,
    description: property.description,
    priceAmount: property.priceAmount,
    propertyStatus: property.propertyStatus as PropertyStatuses,
    propertyType: property.propertyType as PropertyTypes,
    title: property.title,
    imgsToDeleteIds: []
});

export const editPropertyInitForm = (
    property: PropertyModel,
    onSubmit: (values: EditPropertyVariablesForm) => void
): PropertyActionsForm<EditPropertyVariablesForm> => ({
    type: PropertyTypeForm.EDIT,
    variables: editPropertyInit(property),
    validationSchema: editPropertySchemaForm,
    onSubmit
});