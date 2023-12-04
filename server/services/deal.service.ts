import { Deal } from "@/db/models/deal";
import { DealStatus } from "@/db/models/dealstatus";
import { InferCreationAttributes } from "sequelize";
import { DealRequestedBy, DealStatuses, DealsPage, UpdateDeal } from "../types/deal.type";
import { Property } from "@/db/models/property";
import { dealRequestedByFindMap } from "../functions/deal.functions";
import { User } from "@/db/models/user";
import { PropertyAddress } from "@/db/models/propertyaddress";

export class DealService {
    async getAwaitingDealByPropertyIdAndBuyerId(propertyId: string, buyerUserId: string)
    : Promise<Deal | null> {
        return Deal.findOne({
            where: {
                propertyId,
                buyerUserId
            },
            include: [
                { model: DealStatus, where: { statusName: DealStatuses.Awaiting } }
            ]
        });
    }

    async createDeal(data: InferCreationAttributes<Deal>): Promise<Deal> {
        return Deal.create(data);
    }

    async getDealStatusByName(statusName: string): Promise<DealStatus | null> {
        return DealStatus.findOne({
            where: { statusName }
        });
    }

    async getDealStatusByStatusId(dealStatusId: string): Promise<DealStatus | null> {
        return DealStatus.findByPk(dealStatusId);
    }

    async getDealById(dealId: string): Promise<Deal & {DealStatus: DealStatus} | null> {
        return Deal.findByPk(dealId, 
            { include: [{ model: DealStatus }] }
        ) as Promise<Deal & {DealStatus: DealStatus} | null>;
    }

    async updateDealById(data: UpdateDeal, dealId: string) {
        return Deal.update(data, { where: { dealId } });
    }

    async updateDealsByPropertyIdAndStatusId(
        data: UpdateDeal, propertyId: string, dealStatusId: string
    ) {
        return Deal.update(data, { where: { propertyId, dealStatusId } });
    }

    async getAllDeals(
        page: number, 
        limit: number, 
        requestedBy: DealRequestedBy, 
        dealStatusName: DealStatuses,
        userId: string
    ): Promise<DealsPage> {
        const requestedByFunc = dealRequestedByFindMap[requestedBy];
        const requestedByData = requestedByFunc(userId)
        const dealStatus = await this.getDealStatusByName(dealStatusName);
        const totalCount = await Deal.count({
            where: {
                ...requestedByData,
                dealStatusId: dealStatus?.dealStatusId
            }
        });
        const offset = (page - 1) * limit;
        const deals = await Deal.findAll({
            order: [['updatedAt', 'DESC']],
            offset,
            limit,
            where: {
                ...requestedByData,
                dealStatusId: dealStatus?.dealStatusId
            },
            include: [
                { model: Property, include: [{ model: PropertyAddress }] },
                { model: User, as: 'seller', attributes: { exclude: ['password'] } },
                { model: User, as: 'buyer', attributes: { exclude: ['password'] } }
            ]
        });
        return {
            page,
            limit,
            offset,
            totalPages: Math.ceil(totalCount / limit),
            deals
        };
    }
}