export class PropertyAddressModel {
    constructor(
        public propertyAddressId: string,
        public countryName: string,
        public cityName: string,
        public addressLine1: string,
        public addressLine2: string | null
    ) {}
}

export const createPropertyAddressModel = 
    <T extends PropertyAddressModel>(item: T) => new PropertyAddressModel(
        item.propertyAddressId,
        item.countryName, 
        item.cityName,
        item.addressLine1,
        item.addressLine2
    );
