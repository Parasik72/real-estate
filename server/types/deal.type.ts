import { Deal } from "@/db/models/deal";

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
    deals: Deal[];
}