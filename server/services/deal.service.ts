import { Deal } from "@/db/models/deal";
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
                buyerUserId,
                dealStatus: DealStatuses.Awaiting
            }
        });
    }

    async createDeal(data: InferCreationAttributes<Deal>): Promise<Deal> {
        return Deal.create(data);
    }

    async getDealById(dealId: string): Promise<Deal | null> {
        return Deal.findByPk(dealId);
    }

    async updateDealById(data: UpdateDeal, dealId: string) {
        return Deal.update(data, { where: { dealId } });
    }

    async updateDealsByPropertyIdAndStatusId(
        data: UpdateDeal, propertyId: string, dealStatus: DealStatuses
    ) {
        return Deal.update(data, { where: { propertyId, dealStatus } });
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
        const totalCount = await Deal.count({
            where: {
                ...requestedByData,
                dealStatus
            }
        });
        const offset = (page - 1) * limit;
        const deals = await Deal.findAll({
            order: [['updatedAt', 'DESC']],
            offset,
            limit,
            where: {
                ...requestedByData,
                dealStatus
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