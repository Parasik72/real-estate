export class DealModel {
    constructor(
        public dealId: string,
        public signDate: BigInt | null,
        public totalPrice: number,
        public dealStatus: string,
        public propertyId: string,
        public sellerUserId: string,
        public buyerUserId: string,
        public createdAt: BigInt,
        public updatedAt: BigInt,
    ) {}
}

export const createDealModel = 
    <T extends DealModel>(item: T) => new DealModel(
        item.dealId,
        item.signDate,
        item.totalPrice,
        item.dealStatus,
        item.propertyId,
        item.sellerUserId,
        item.buyerUserId,
        item.createdAt,
        item.updatedAt,
    );
