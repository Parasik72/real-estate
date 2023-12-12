import { DealModel } from "./deal.model";

export interface DealsPageResponse {
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    deals: DealModel[];
}