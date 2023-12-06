const getArticle = (word: string) => /^[aeiouy]/.test(word) ? 'an' : 'a';

export const getPropertyTypeNameWithArticle = (propertyType: string) => {
    return `${getArticle(propertyType)} ${propertyType}`;
}