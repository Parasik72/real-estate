import { DealPaginationNames, DealRequestedBy, DealStatuses, DealsPage, IDeal, UpdateDeal } from "../types/deal.type";
import { dealRequestedByFindMap } from "../functions/deal.functions";
import BaseContext from "../context/base-context";
import { InferCreationAttributes } from "sequelize";

export class DealService extends BaseContext {
    async getAwaitingDealByPropertyIdAndBuyerId(propertyId: string, buyerUserId: string)
    : Promise<IDeal | null> {
        return this.di.Deal.findOne({
            where: {
                propertyId,
                buyerUserId,
                dealStatus: DealStatuses.Awaiting
            }
        });
    }

    async createDeal(data: InferCreationAttributes<IDeal>): Promise<IDeal> {
        return this.di.Deal.create(data);
    }

    async getDealById(dealId: string): Promise<IDeal | null> {
        return this.di.Deal.findByPk(dealId);
    }

    async updateDealById(data: UpdateDeal, deal: IDeal): Promise<IDeal> {
        if (data.dealStatus) deal.dealStatus = data.dealStatus;
        if (data.signDate) deal.signDate = data.signDate;
        deal.updatedAt = data.updatedAt;
        deal.save();
        return deal;
    }

    async updateDealsByPropertyIdAndStatusId(
        data: UpdateDeal, propertyId: string, dealStatus: DealStatuses
    ) {
        return this.di.Deal.update(data, { where: { propertyId, dealStatus } });
    }

    async getAllDeals(
        page: number, 
        limit: number, 
        requestedBy: DealRequestedBy, 
        dealStatus: DealStatuses,
        userId: string
    ): Promise<DealsPage> {
        const requestedByFunc = dealRequestedByFindMap[requestedBy];
        const requestedByData = requestedByFunc(userId)
        const totalCount = await this.di.Deal.count({
            where: {
                ...requestedByData,
                dealStatus
            }
        });
        const offset = (page - 1) * limit;
        const deals = await this.di.Deal.findAll({
            order: [['updatedAt', 'DESC']],
            offset,
            limit,
            where: {
                ...requestedByData,
                dealStatus
            },
            include: [
                { 
                    model: this.di.Property, 
                    include: [{ model: this.di.PropertyAddress }, { model: this.di.PropertyImage, limit: 1 }] 
                },
                { model: this.di.User, as: 'seller', attributes: { exclude: ['password'] } },
                { model: this.di.User, as: 'buyer', attributes: { exclude: ['password'] } }
            ]
        });
        return {
            page,
            limit,
            offset,
            totalPages: Math.ceil(totalCount / limit),
            deals,
            paginationName: requestedBy === DealRequestedBy.Buyer 
                ? DealPaginationNames.RequestedByMeDeals
                : requestedBy === DealRequestedBy.Seller
                ? DealPaginationNames.RequestedForMeDeals
                : DealPaginationNames.MySuccessfulDeals
        };
    }
}