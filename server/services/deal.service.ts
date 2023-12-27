import { CreateDeal, DealPaginationNames, DealRequestedBy, DealStatuses, IDeal, UpdateDeal } from "../types/deal.type";
import { dealRequestedByFindMap } from "../functions/deal.functions";
import BaseContext from "../context/base-context";
import { InferCreationAttributes, Order } from "sequelize";
import { getModelPage } from "../functions/model.functions";
import { IPager } from "../types/controller.types";
import { v4 } from "uuid";
import { UUID } from "crypto";
import { IUser } from "../types/user.types";
import { IProperty } from "../types/properties.types";

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

    async createDeal(user: IUser, property: IProperty): Promise<IDeal> {
        const dealId = v4() as UUID;
        const time = BigInt(new Date().getTime());
        return this.di.Deal.create({
            dealId,
            buyerUserId: user?.userId!,
            sellerUserId: property.userId,
            dealStatus: DealStatuses.Awaiting,
            propertyId: property.propertyId,
            signDate: null,
            totalPrice: property.priceAmount,
            createdAt: time,
            updatedAt: time
        });
    }

    async getDealById(dealId: string): Promise<IDeal | null> {
        return this.di.Deal.findByPk(dealId);
    }

    async updateDealById(data: UpdateDeal, deal: IDeal): Promise<IDeal> {
        const updatedAt = BigInt(new Date().getTime());
        if (data.dealStatus) deal.dealStatus = data.dealStatus;
        if (data.signDate) deal.signDate = data.signDate;
        deal.updatedAt = updatedAt;
        deal.save();
        return deal;
    }

    async updateDealsByPropertyIdAndStatusId(
        data: UpdateDeal, propertyId: string, dealStatus: DealStatuses
    ) {
        return this.di.Deal.update(data, { where: { propertyId, dealStatus } });
    }

    async signDeal(deal: IDeal) {
        const time = BigInt(new Date().getTime());
        const updatedDeal = await this.updateDealById({
            updatedAt: time,
            signDate: time,
            dealStatus: DealStatuses.Done
        }, deal);
        await this.di.propertyService.changePropertyOwnerById({ 
            userId: deal.buyerUserId,
            updatedAt: time
        }, deal.propertyId);
        await this.di.dealService.updateDealsByPropertyIdAndStatusId({ 
            dealStatus: DealStatuses.Canceled,
            updatedAt: time
        }, deal.propertyId, DealStatuses.Awaiting);
        return updatedDeal;
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