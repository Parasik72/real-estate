export class PropertyModel {
    constructor(
        public propertyId: string,
        public bedRooms: number,
        public bathRooms: number,
        public area: number,
        public title: string,
        public description: string,
        public priceAmount: number,
        public propertyStatus: string,
        public userId: string,
        public propertyAddressId: string,
        public propertyType: string,
        public createdAt: BigInt,
        public updatedAt: BigInt
    ) {}
}

export const createPropertyModel = 
    <T extends PropertyModel>(item: T) => new PropertyModel(
        item.propertyId,
        item.bedRooms,
        item.bathRooms,
        item.area,
        item.title,
        item.description,
        item.priceAmount,
        item.propertyStatus,
        item.userId,
        item.propertyAddressId,
        item.propertyType,
        item.createdAt,
        item.updatedAt
    );
