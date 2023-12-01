import { PropertyTypeModel } from "../services/property/property-type.model";

const getArticle = (word: string) => /^[aeiouy]/.test(word) ? 'an' : 'a';

export const getPropertyTypeNameWithArticle = (propertyType: PropertyTypeModel) => {
    return `${getArticle(propertyType.typeName)} ${propertyType.typeName}`;
}