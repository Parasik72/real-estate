import { HttpException } from "../exceptions/http.exception";
import type * as Params from "../params/deal.params";
import type { ControllerConfig } from "../types/controller.types";
import { PropertyStatuses } from "../types/properties.types";
import { DealRequestedBy, DealStatuses } from "../types/deal.type";
import * as Constants from "../constants/deal.constants";
import { BaseController } from "./base-controller";
import POST from "../decorators/post.decorator";
import GET from "../decorators/get.decorator";
import USE from "../decorators/use.decorator";
import { sessions } from "../sessions";
import { deserializeUser } from "../passport";
import { isLogedIn } from "../middlewares/is-loged-in.middleware";
import { objectToJSON } from "../functions/json.functions";
import SSR from "../decorators/ssr.decorator";
import MESSAGE from "../decorators/message.decorator";
import PAGER from "../decorators/pager.decorator";
import INJECTABLE from "../decorators/injectable.decorator";

@INJECTABLE()
@USE([sessions, deserializeUser, isLogedIn])
export class DealController extends BaseController {
    @POST('/api/deals/send/:propertyId')
    @MESSAGE('The deal request has been sent successfully!')
    async sendDeal({ query, user }: ControllerConfig<{}, Params.SendDealParams>) {
        const { PropertyService, DealService } = this.di;
        const { propertyId } = query;
        const property = await PropertyService.getPropertyWithOwnerAndStatusByPropertyId(propertyId);
        if (!property) throw new HttpException("The property was not found", 404);
        if (property.User.userId === user?.userId) {
            throw new HttpException("You can't send deals to yourself", 403);
        }
        if (property.propertyStatus !== PropertyStatuses.ForSale) {
            throw new HttpException("This property is not for sale", 400);
        }
        const dealExists = await DealService.getAwaitingDealByPropertyIdAndBuyerId(property.propertyId, user?.userId!);
        if (dealExists) throw new HttpException("You already have the awaiting deal with this property", 400);
        await DealService.createDeal(user!, property);
    }

    @POST('/api/deals/sign/:dealId')
    @MESSAGE('The deal has been signed successfully!')
    async signDeal({ query, user }: ControllerConfig<{}, Params.SignDealParams>) {
        const { DealService } = this.di;
        const { dealId } = query;
        const deal = await DealService.getDealById(dealId);
        if (!deal) throw new HttpException('The deal was not found', 404);
        if (deal.sellerUserId !== user?.userId) {
            throw new HttpException("You don't have access to sign this deal", 403);
        }
        if (deal.dealStatus !== DealStatuses.Awaiting) {
            throw new HttpException('You can not sign this deal', 403);
        }
        const updatedDeal = await DealService.signDeal(deal);
        return objectToJSON(updatedDeal);
    }

    @POST('/api/deals/cancel/:dealId')
    @MESSAGE('The deal has been canceled successfully!')
    async cancelDeal({ query, user }: ControllerConfig<{}, Params.CancelDealParams>) {
        const { DealService } = this.di;
        const { dealId } = query;
        const deal = await DealService.getDealById(dealId);
        if (!deal) throw new HttpException('The deal was not found', 404);
        if (deal.dealStatus !== DealStatuses.Awaiting) {
            throw new HttpException('You can not cancel this deal', 403);
        }
        if (deal.buyerUserId !== user?.userId && deal.sellerUserId !== user?.userId) {
            throw new HttpException("You don't have access to cancel this deal", 403);
        }
        await DealService.updateDealById({ 
            dealStatus: DealStatuses.Canceled
        }, deal);
        return objectToJSON(deal);
    }

    @SSR('/deals')
    @GET('/api/deals')
    @PAGER()
    async getAllDeals({ query, user }: ControllerConfig<{}, Params.GetAllDealsParams>) {
        const { DealService } = this.di;
        const page = query.page || Constants.DEALS_PAGE_DEFAULT;
        const limit = query.limit || Constants.DEALS_LIMIT_DEFAULT;
        const requestedBy = 
            query.requestedBy as DealRequestedBy || Constants.DEALS_REQUESTED_BY_DEFAULT;
        const dealStatusName = 
            query.dealStatusName as DealStatuses || Constants.DEALS_STATUS_NAME_DEFAULT;
        return DealService.getAllDeals(
            +page, +limit, requestedBy, dealStatusName, user?.userId!
        );
    }
}