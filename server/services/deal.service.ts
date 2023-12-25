import { DealPaginationNames, DealRequestedBy, DealStatuses, IDeal, UpdateDeal } from "../types/deal.type";
import { dealRequestedByFindMap } from "../functions/deal.functions";
import BaseContext from "../context/base-context";
import { InferCreationAttributes, Order } from "sequelize";
import { getModelPage } from "../functions/model.functions";
import { IPager } from "../types/controller.types";

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
    ): Promise<IPager<IDeal>> {
        const requestedByFunc = dealRequestedByFindMap[requestedBy];
        const requestedByData = requestedByFunc(userId)
        const countOptions = { where: { ...requestedByData, dealStatus} };
        const findAllOptions = {
            order: [['updatedAt', 'DESC']] as Order,
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
        };
        const pageName = requestedBy === DealRequestedBy.Buyer 
            ? DealPaginationNames.RequestedByMeDealsPage
            : requestedBy === DealRequestedBy.Seller
            ? DealPaginationNames.RequestedForMeDealsPage
            : DealPaginationNames.MySuccessfulDealsPage;
        return getModelPage(this.di.Deal, page, limit, pageName, countOptions, findAllOptions);
    }
}