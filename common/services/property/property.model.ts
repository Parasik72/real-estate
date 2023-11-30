import { GetPropertyResponse } from "./property-http.types";

export class PropertyModel {
    constructor(
        public propertyId: string,
        public bedRooms: number,
        public bathRooms: number,
        public area: number,
        public title: string,
        public description: string,
        public priceAmount: number,
        public propertyStatusId: string,
        public userId: string,
        public propertyAddressId: string,
        public propertyTypeId: string,
        public createdAt: BigInt,
        public updatedAt: BigInt
    ) {}
}

export const createPropertyModel 
    = (item: GetPropertyResponse) => new PropertyModel(
        item.propertyId,
        item.bedRooms,
        item.bathRooms,
        item.area,
        item.title,
        item.description,
        item.priceAmount,
        item.propertyStatusId,
        item.userId,
        item.propertyAddressId,
        item.propertyTypeId,
        item.createdAt,
        item.updatedAt
    );
