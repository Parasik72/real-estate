import { UUID } from "crypto";
import { Model } from "sequelize";

export type DealStatus = DealStatuses.Awaiting | DealStatuses.Canceled | DealStatuses.Done;
export interface IDeal extends Model {
    dealId: UUID;
    signDate: BigInt | null;
    totalPrice: number;
    dealStatus: DealStatus;
    propertyId: UUID;
    sellerUserId: UUID;
    buyerUserId: UUID;
    createdAt: BigInt;
    updatedAt: BigInt;
}

export enum DealStatuses {
    Done='Done',
    Awaiting='Awaiting',
    Canceled='Canceled',
}

export enum DealRequestedBy {
    None="None",
    Seller="Seller",
    Buyer="Buyer",
}

export interface UpdateDeal {
    signDate?: BigInt | null;
    dealStatus?: DealStatuses;
    updatedAt: BigInt;
}

export interface DealsPage {
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    deals: IDeal[];
}