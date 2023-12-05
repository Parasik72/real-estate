import { v4 } from "uuid";
import container from "../container";
import { HttpException } from "../exceptions/http.exception";
import { 
    CancelDealParams, 
    GetAllDealsParams, 
    SendDealParams, 
    SignDealParams 
} from "../params/deal.params";
import { DealService } from "../services/deal.service";
import { PropertyService } from "../services/property.service";
import type { ControllerConfig } from "../types/controller.types";
import { PropertyStatuses } from "../types/properties.types";
import { UUID } from "crypto";
import { DealRequestedBy, DealStatuses } from "../types/deal.type";
import { 
    DEALS_LIMIT_DEFAULT, 
    DEALS_PAGE_DEFAULT, 
    DEALS_REQUESTED_BY_DEFAULT, 
    DEALS_STATUS_NAME_DEFAULT 
} from "../constants/deal.constants";
import { BaseController } from "../base-controller";
import POST from "../decorators/post.decorator";
import GET from "../decorators/get.decorator";
import USE from "../decorators/use.decorator";
import { sessions } from "../sessions";
import { passportInitialize, passportSession } from "../passport";
import { isLogedIn } from "../middlewares/is-loged-in.middleware";

@USE([sessions, passportInitialize, passportSession, isLogedIn])
export class DealController extends BaseController {
    @POST('/api/deals/send/:propertyId')
    async sendDeal({ query, user }: ControllerConfig<{}, SendDealParams>) {
        const propertyService = container.resolve<PropertyService>('propertyService');
        const dealService = container.resolve<DealService>('dealService');
        const { propertyId } = query;
        const property = await propertyService.getPropertyWithOwnerAndStatusByPropertyId(propertyId);
        if (!property) throw new HttpException("The property was not found", 404);
        if (property.User.userId === user?.userId) {
            throw new HttpException("You can't send deals to yourself", 403);
        }
        if (property.PropertyStatus.statusName !== PropertyStatuses.ForSale) {
            throw new HttpException("This property is not for sale", 400);
        }
        const dealExists = await dealService.getAwaitingDealByPropertyIdAndBuyerId(property.propertyId, user?.userId!);
        if (dealExists) throw new HttpException("You already have the awaiting deal with this property", 400);
        const dealStatus = await dealService.getDealStatusByName(DealStatuses.Awaiting);
        if (!dealStatus) throw new HttpException("The deal status was not found", 404);
        const dealId = v4() as UUID;
        const time = BigInt(new Date().getTime());
        await dealService.createDeal({
            dealId,
            buyerUserId: user?.userId!,
            sellerUserId: property.userId,
            dealStatusId: dealStatus.dealStatusId,
            propertyId: property.propertyId,
            signDate: null,
            totalPrice: property.priceAmount,
            createdAt: time,
            updatedAt: time
        });
        return { message: 'The deal request has been sent successfully.' };
    }

    @POST('/api/deals/sign/:propertyId')
    async signDeal({ query, user }: ControllerConfig<{}, SignDealParams>) {
        const propertyService = container.resolve<PropertyService>('propertyService');
        const dealService = container.resolve<DealService>('dealService');
        const { dealId } = query;
        const deal = await dealService.getDealById(dealId);
        if (!deal) throw new HttpException('The deal was not found', 404);
        if (deal.sellerUserId !== user?.userId) {
            throw new HttpException("You don't have access to sign this deal", 403);
        }
        if (deal.DealStatus.statusName !== DealStatuses.Awaiting) {
            throw new HttpException('You can not sign this deal', 403);
        }
        const doneDealStatus = await dealService.getDealStatusByName(DealStatuses.Done);
        if (!doneDealStatus) throw new HttpException("The deal status was not found", 404);
        const cancelDealStatus = await dealService.getDealStatusByName(DealStatuses.Canceled);
        if (!cancelDealStatus) {
            throw new HttpException('The deal status for cancel was not found', 404);
        }
        const awaitingDealStatus = await dealService.getDealStatusByName(DealStatuses.Awaiting);
        if (!awaitingDealStatus) {
            throw new HttpException('The deal status for await was not found', 404);
        }
        const time = BigInt(new Date().getTime());
        await dealService.updateDealById({
            updatedAt: time,
            signDate: time,
            dealStatusId: doneDealStatus.dealStatusId
        }, deal.dealId);
        await propertyService.changePropertyOwnerById({ 
            userId: deal.buyerUserId,
            updatedAt: time
        }, deal.propertyId);
        await dealService.updateDealsByPropertyIdAndStatusId({ 
            dealStatusId: cancelDealStatus.dealStatusId,
            updatedAt: time
        }, deal.propertyId, awaitingDealStatus.dealStatusId);
        return { message: 'The deal has been signed successfully.' }
    }

    @POST('/api/deals/cancel/:propertyId')
    async cancelDeal({ query, user }: ControllerConfig<{}, CancelDealParams>) {
        const dealService = container.resolve<DealService>('dealService');
        const { dealId } = query;
        const deal = await dealService.getDealById(dealId);
        if (!deal) throw new HttpException('The deal was not found', 404);
        if (deal.DealStatus?.statusName !== DealStatuses.Awaiting) {
            throw new HttpException('You can not cancel this deal', 403);
        }
        if (deal.buyerUserId !== user?.userId && deal.sellerUserId !== user?.userId) {
            throw new HttpException("You don't have access to cancel this deal", 403);
        }
        const cancelDealStatus = await dealService.getDealStatusByName(DealStatuses.Canceled);
        if (!cancelDealStatus) {
            throw new HttpException('The deal status for cancel was not found', 404);
        }
        const time = BigInt(new Date().getTime());
        await dealService.updateDealById({ 
            dealStatusId: cancelDealStatus.dealStatusId,
            updatedAt: time
        }, deal.dealId);
        return { message: 'The deal has been canceled successfully.' }
    }

    @GET('/api/deals')
    async getAllDeals({ query, user }: ControllerConfig<{}, GetAllDealsParams>) {
        const dealService = container.resolve<DealService>('dealService');
        const page = query.page || DEALS_PAGE_DEFAULT;
        const limit = query.limit || DEALS_LIMIT_DEFAULT;
        const requestedBy = query.requestedBy as DealRequestedBy || DEALS_REQUESTED_BY_DEFAULT;
        const dealStatusName = query.dealStatusName as DealStatuses || DEALS_STATUS_NAME_DEFAULT;
        return dealService.getAllDeals(
            +page, +limit, requestedBy, dealStatusName, user?.userId!
        );
    }
}