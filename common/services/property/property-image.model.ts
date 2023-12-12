export class PropertyImageModel {
    constructor(
        public propertyImageId: string,
        public imgName: string,
        public propertyId: string
    ) {}
}

export const createPropertyImageModel = 
    <T extends PropertyImageModel>(item: T) => new PropertyImageModel(
        item.propertyImageId,
        item.imgName, 
        item.propertyId
    );
