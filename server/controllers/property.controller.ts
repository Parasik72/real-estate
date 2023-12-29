import { HttpException } from "../exceptions/http.exception";
import type * as Params from "../params/property.params";
import type { CreatePropertyDto } from "../dto/property/create-property.dto";
import type { UpdatePropertyDto } from "../dto/property/update-property.dto";
import type { ControllerConfig } from "../types/controller.types";
import GET from "../decorators/get.decorator";
import { BaseController } from "./base-controller";
import PATCH from "../decorators/patch.decorator";
import POST from "../decorators/post.decorator";
import SSR from "../decorators/ssr.decorator";
import USE from "../decorators/use.decorator";
import { sessions } from "../sessions";
import { deserializeUser, passportInitialize, passportSession } from "../passport";
import multer from "multer";
import { isLogedIn } from "../middlewares/is-loged-in.middleware";
import { createPropertyValidation } from "../validators/property-schemas/create-property.schema";
import { updatePropertyValidation } from "../validators/property-schemas/update-property.schema";
import validate, { ValidationType } from "../validators/validate";
import { objectToJSON } from "../functions/json.functions";
import { allOffersValidation } from "../validators/property-schemas/get-all-offers.schema";
import MESSAGE from "../decorators/message.decorator";
import PAGER from "../decorators/pager.decorator";
import CONTROLLER from "../decorators/controller.decorator";

@CONTROLLER()
export class PropertyController extends BaseController {
  @SSR('/properties/last-offers')
  @GET('/api/properties/last-offers')
  async getLastOffers() {
    return this.di.PropertyService.getLastOffers();
  }

  @SSR('/properties/offers')
  @GET('/api/properties/offers')
  @USE(validate(allOffersValidation, ValidationType.Query))
  @PAGER()
  async getAllOffers({ query }: ControllerConfig<{}, Params.GetAllPropertiesParams>) {
    return this.di.PropertyService.getAllOffers(query);
  }

  @SSR('/user/profile')
  @GET('/api/properties/user/:userId')
  @PAGER()
  async getUserProperties({ query }: ControllerConfig<{}, Params.GetUserProperties>) {
    return this.di.PropertyService.getUserProperties(query.userId, query.page, query.limit);
  }

  @USE([sessions, passportInitialize, passportSession, multer().any(), validate(createPropertyValidation)])
  @POST('/api/properties')
  @MESSAGE('The property has been created successfully!')
  async createProperty({ body, user, files }: ControllerConfig<CreatePropertyDto>) {
    const { PropertyService } = this.di;
    const property = await PropertyService.createProperty(body, user!, files!);
    return objectToJSON(property);
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
  @MESSAGE('The property has been updated successfully!')
  async updatePropertyById({ query, body, files, user }
  : ControllerConfig<UpdatePropertyDto, Params.UpdatePropertyParams>) {
    const { PropertyService } = this.di;
    const property = await PropertyService.getPropertyById(query.propertyId);
    if (!property) throw new HttpException("The property was not found", 404);
    if (property.userId !== user?.userId) {
      throw new HttpException("You don't have a permission to update this property", 403);
    }
    if (body.propertyStatus) {
      if (property.propertyStatus === body.propertyStatus) {
        throw new HttpException('The property already uses this property status', 400);
      }
    }
    await PropertyService.updatePropertyById(body, property, files);
  }

  @USE([sessions, deserializeUser])
  @SSR('/properties/:propertyId')
  @GET('/api/properties/get/:propertyId')
  async getPropertyById({ query, user }: ControllerConfig<{}, Params.GetPropertyByIdParams>) {
    const { PropertyService } = this.di;
    const { propertyId } = query;
    const property = await PropertyService.getPropertyWithOwnerByPropertyId(propertyId, user);
    if (!property) throw new HttpException("The property was not found", 404);
    return property;
  }
}