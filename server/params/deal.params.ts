export type SendDealParams = {
    propertyId: string;
}

export type SignDealParams = {
    dealId: string;
}

export type CancelDealParams = {
    dealId: string;
}

export type GetAllDealsParams = {
    page?: string;
    limit?: string;
    requestedBy?: string;
    dealStatusName?: string;
}