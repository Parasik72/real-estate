import { IPagination } from "@/common/types/common.types";
import { DealModel } from "./deal.model";

export interface DealsPageResponse extends IPagination {
    deals: DealModel[];
}