import { HttpException } from "../exceptions/http.exception";
import * as Params from "../params/property.params";
import { CreatePropertyDto } from "../dto/property/create-property.dto";
import { v4 } from "uuid";
import { UUID } from "crypto";
import { UpdatePropertyDto } from "../dto/property/update-property.dto";
import type { ControllerConfig } from "../types/controller.types";
import { DealStatuses } from "../types/deal.type";
import GET from "../decorators/get.decorator";
import { BaseController } from "./base-controller";
import PATCH from "../decorators/patch.decorator";
import POST from "../decorators/post.decorator";
import SSR from "../decorators/ssr.decorator";
import USE from "../decorators/use.decorator";
import { sessions } from "../sessions";
import { passportInitialize, passportSession } from "../passport";
import multer from "multer";
import { isLogedIn } from "../middlewares/is-loged-in.middleware";
import { createPropertyValidation } from "../validators/property-schemas/create-property.schema";
import { updatePropertyValidation } from "../validators/property-schemas/update-property.schema";
import validate from "../validators/validate";
import { objectToJSON } from "../functions/json.functions";

export class PropertyController extends BaseController {
  @SSR('/properties/last-offers')
  @GET('/api/properties/last-offers')
  async getLastOffers() {
    return this.di.propertyService.getLastOffers();
  }

  @SSR('/properties/offers')
  @GET('/api/properties/offers')
  async getAllOffers({ query }: ControllerConfig<{}, Params.GetAllPropertiesParams>) {
    return this.di.propertyService.getAllOffers(query);
  }

  @USE([sessions, passportInitialize, passportSession, multer().any(), validate(createPropertyValidation)])
  @POST('/api/properties')
  async createProperty({ body, user, files }: ControllerConfig<CreatePropertyDto>) {
    const { propertyService } = this.di;
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
    const property = await propertyService.createProperty({
      ...body,
      propertyId,
      userId,
      propertyAddressId,
      createdAt: time,
      updatedAt: time,
    });
    await propertyService.createPropertyImages(propertyId, files!);
    return { 
      message: 'The property has been created successfully.',
      property: objectToJSON(property) 
    };
  }

  @USE([
    sessions, 
    passportInitialize, 
    passportSession, 
    isLogedIn, 
    multer().any(), 
    validate(updatePropertyValidation)
  ])
  @PATCH('/api/properties/patch/:propertyId')
  async updatePropertyById({ query, body, files, user }
  : ControllerConfig<UpdatePropertyDto, Params.UpdatePropertyParams>) {
    const { propertyService, dealService } = this.di;
    const property = await propertyService.getPropertyById(query.propertyId);
    if (!property) throw new HttpException("The property was not found", 404);
    if (property.userId !== user?.userId) {
      throw new HttpException("You don't have a permission to update this property", 403);
    }
    if (body.propertyStatus) {
      if (property.propertyStatus === body.propertyStatus) {
        throw new HttpException('The property already uses this property status', 400);
      }
      await dealService.updateDealsByPropertyIdAndStatusId({ 
        dealStatus: DealStatuses.Canceled,
        updatedAt: BigInt(new Date().getTime())
      }, property.propertyId, DealStatuses.Awaiting);
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
      propertyStatus: body.propertyStatus,
      propertyType: body.propertyType,
      updatedAt: BigInt(new Date().getTime())
    }, property.propertyId);
    if (body.imgsToDeleteIds) {
      await propertyService.deletePropertyImages(body.imgsToDeleteIds, property.propertyId);
    } 
    if (files) await propertyService.createPropertyImages(property.propertyId, files!);
    return { message: 'The property has been updated successfully.' };
  }

  @SSR('/properties/:propertyId')
  @GET('/api/properties/get/:propertyId')
  async getPropertyById({ query }: ControllerConfig<{}, Params.GetPropertyByIdParams>) {
    const { propertyService } = this.di;
    const { propertyId } = query;
    const property = await propertyService.getPropertyWithOwnerByPropertyId(propertyId);
    if (!property) throw new HttpException("The property was not found", 404);
    return property;
  }
}