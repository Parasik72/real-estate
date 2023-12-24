export enum DealStatuses {
    Done='Done',
    Awaiting='Awaiting',
    Canceled='Canceled',
}
export interface DealModel {
    dealId: string,
    signDate: BigInt | null,
    totalPrice: number,
    dealStatus: string,
    propertyId: string,
    sellerUserId: string,
    buyerUserId: string,
    createdAt: BigInt,
    updatedAt: BigInt,
}
