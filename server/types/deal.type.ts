import { Deal } from "@/db/models/deal";
import { UUID } from "crypto";

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
    dealStatusId?: UUID;
    updatedAt: BigInt;
}

export interface DealsPage {
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    deals: Deal[];
}