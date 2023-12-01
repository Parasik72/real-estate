export class PropertyTypeModel {
    constructor(
        public propertyTypeId: string,
        public typeName: string,
    ) {}
}

export const createPropertyTypeModel = 
    <T extends PropertyTypeModel>(item: T) => new PropertyTypeModel(
        item.propertyTypeId,
        item.typeName
    );
