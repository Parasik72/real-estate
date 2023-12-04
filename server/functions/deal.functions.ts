import { DealRequestedBy } from "../types/deal.type";

export const dealRequestedByFindMap = {
    [DealRequestedBy.None]: (_: string) => ({}),
    [DealRequestedBy.Seller]: (userId: string) => ({ sellerUserId: userId }),
    [DealRequestedBy.Buyer]: (userId: string) => ({ buyerUserId: userId }),
};