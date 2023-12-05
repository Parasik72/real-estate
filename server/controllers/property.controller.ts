import container from "../container";
import { PropertyService } from "../services/property.service";
import { HttpException } from "../exceptions/http.exception";
import { GetAllPropertiesParams, GetPropertyByIdParams, UpdatePropertyParams } from "../params/property.params";
import { CreatePropertyDto } from "../dto/property/create-property.dto";
import { v4 } from "uuid";
import { UUID } from "crypto";
import { UpdatePropertyDto } from "../dto/property/update-property.dto";
import type { ControllerConfig } from "../types/controller.types";
import { DealService } from "../services/deal.service";
import { DealStatuses } from "../types/deal.type";
import GET from "../decorators/get.decorator";
import { BaseController } from "../base-controller";
import PATCH from "../decorators/patch.decorator";
import POST from "../decorators/post.decorator";
import SSR from "../decorators/ssr.decorator";

export class PropertyController extends BaseController {
  @SSR('/properties/last-offers')
  @GET('/api/properties/last-offers')
  async getLastOffers() {
    const propertyService = container.resolve<PropertyService>('propertyService');
    return propertyService.getLastOffers();
  }

  @SSR('/properties/offers')
  @GET('/api/properties/offers')
  async getAllOffers({ query }: ControllerConfig<{}, GetAllPropertiesParams>) {
    const propertyService = container.resolve<PropertyService>('propertyService');
    return propertyService.getAllOffers(query);
  }

  @SSR('/properties/:propertyId')
  @GET('/api/properties/:propertyId')
  async getPropertyById({ query }: ControllerConfig<{}, GetPropertyByIdParams>) {
    const propertyService = container.resolve<PropertyService>('propertyService')
    const { propertyId } = query;
    const property = await propertyService.getPropertyWithOwnerByPropertyId(propertyId);
    if (!property) throw new HttpException("The property was not found", 404);
    return property;
  }

  @POST('/api/properties')
  async createProperty({ body, user, files }: ControllerConfig<CreatePropertyDto>) {
    const propertyService = container.resolve<PropertyService>('propertyService');
    const propertyType = await propertyService.getPropertyTypeById(body.propertyTypeId);
    if (!propertyType) throw new HttpException('The property type was not found', 404);
    const propertyStatus = await propertyService.getPropertyStatusById(body.propertyStatusId);
    if (!propertyStatus) throw new HttpException('The property status was not found', 404);
    const propertyAddressId = v4() as UUID;
    await propertyService.createPropertyAddress({
      propertyAddressId,
      countryName: body.countryName,
      cityName: body.cityName,
      addressLine1: body.addressLine1,
      addressLine2: body.addressLine2,
    });
    const propertyId = v4() as UUID;
    const userId = user?.userId as UUID;
    const time = BigInt(new Date().getTime());
    await propertyService.createProperty({
      ...body,
      propertyStatusId: propertyStatus.propertyStatusId,
      propertyTypeId: propertyType.propertyTypeId,
      propertyId,
      userId,
      propertyAddressId,
      createdAt: time,
      updatedAt: time,
    });
    await propertyService.createPropertyImages(propertyId, files!);
    return { message: 'The property has been created successfully.' };
  }

  @PATCH('/api/properties/:propertyId')
  async updatePropertyById({ query, body, files }
  : ControllerConfig<UpdatePropertyDto, UpdatePropertyParams>) {
    const dealService = container.resolve<DealService>('dealService');
    const propertyService = container.resolve<PropertyService>('propertyService');
    const property = await propertyService.getPropertyById(query.propertyId);
    if (!property) throw new HttpException("The property was not found", 404);
    if (body.propertyTypeId) {
      const propertyType = await propertyService.getPropertyTypeById(body.propertyTypeId);
      if (!propertyType) throw new HttpException('The property type was not found', 404);
    }
    if (body.propertyStatusId) {
      if (property.propertyStatusId === body.propertyStatusId) {
        throw new HttpException('The property already uses this property status', 400);
      }
      const propertyStatus = await propertyService.getPropertyStatusById(body.propertyStatusId);
      if (!propertyStatus) throw new HttpException('The property status was not found', 404);
      const cancelDealStatus = await dealService.getDealStatusByName(DealStatuses.Canceled);
      if (!cancelDealStatus) {
        throw new HttpException('The deal status for cancel was not found', 404);
      }
      const awaitingDealStatus = await dealService.getDealStatusByName(DealStatuses.Awaiting);
      if (!awaitingDealStatus) {
        throw new HttpException('The deal status for await was not found', 404);
      }
      await dealService.updateDealsByPropertyIdAndStatusId({ 
        dealStatusId: cancelDealStatus.dealStatusId,
        updatedAt: BigInt(new Date().getTime())
      }, property.propertyId, awaitingDealStatus.dealStatusId);
    }
    await propertyService.updatePropertyAddressById({
      countryName: body.countryName,
      cityName: body.cityName,
      addressLine1: body.addressLine1,
      addressLine2: body.addressLine2,
    }, property.propertyAddressId);
    await propertyService.updatePropertyById({
      area: body.area,
      bathRooms: body.bathRooms,
      bedRooms: body.bedRooms,
      title: body.title,
      description: body.description,
      priceAmount: body.priceAmount,
      propertyStatusId: body.propertyStatusId as UUID,
      propertyTypeId: body.propertyTypeId as UUID,
      updatedAt: BigInt(new Date().getTime())
    }, property.propertyId);
    if (body.imgsToDeleteIds) await propertyService.deletePropertyImages(body.imgsToDeleteIds);
    if (files) await propertyService.createPropertyImages(property.propertyId, files!);
    return { message: 'The property has been updated successfully.' };
  }
}