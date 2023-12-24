import { UUID } from "crypto";
import { Model } from "sequelize";
import { IPager } from "./controller.types";

export type PropertyStatus = PropertyStatuses.Awaiting | PropertyStatuses.ForSale;
export type PropertyType = PropertyTypes.House | PropertyTypes.Apartment | PropertyTypes.Villa;

export interface IProperty extends Model {
  propertyId: UUID;
  bedRooms: number;
  bathRooms: number;
  area: number;
  title: string;
  description: string;
  priceAmount: number;
  propertyStatus: PropertyStatus;
  userId: UUID;
  propertyAddressId: UUID;
  propertyType: PropertyType;
  createdAt: BigInt;
  updatedAt: BigInt;
}

export interface IPropertyAddress extends Model {
    propertyAddressId: UUID;
    countryName: string;
    cityName: string;
    addressLine1: string;
    addressLine2: string | null;
}

export interface IPropertyImage extends Model {
    propertyImageId: string;
    imgName: string;
    propertyId: UUID;
}

export enum PropertyPaginationNames {
    AllOffers = 'allOffers',
    UserProperties = 'userProperties',
}

export type PropertyWithAddress = IProperty & { PropertyAddress: IPropertyAddress };

export enum PropertyStatuses {
    ForSale='For sale',
    Awaiting='Awaiting',
}

export enum PropertyTypes {
    House='House',
    Apartment='Apartment',
    Villa='Villa'
}

export interface UpdateProperty {
    bedRooms?: number;
    bathRooms?: number;
    area?: number;
    title?: string;
    description?: string;
    priceAmount?: number;
    propertyStatus?: PropertyStatuses;
    propertyType?: PropertyTypes;
    updatedAt: BigInt;
}

export interface ChangePropertyOwner {
    userId: UUID;
    updatedAt: BigInt;
}

export interface UpdatePropertyAddress {
    countryName?: string;
    cityName?: string;
    addressLine1?: string;
    addressLine2?: string | null;
}