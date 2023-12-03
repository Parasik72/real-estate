import container from "../container";
import { PropertyService } from "../services/property.service";
import { HttpException } from "../exceptions/http.exception";
import { GetAllPropertiesParams, GetPropertyByIdParams, UpdatePropertyParams } from "../params/property.params";
import { CreatePropertyDto } from "../dto/property/create-property.dto";
import { v4 } from "uuid";
import { UUID } from "crypto";
import { UpdatePropertyDto } from "../dto/property/update-property.dto";
import { ControllerConfig } from "../types/controller.types";

export class PropertyController {
  async getLastOffers() {
    const propertyService = container.resolve<PropertyService>('propertyService');
    return propertyService.getLastOffers();
  }

  async getAllOffers({ query }: ControllerConfig<{}, GetAllPropertiesParams>) {
    const propertyService = container.resolve<PropertyService>('propertyService');
    const page = query.page || 1;
    const limit = query.limit || 12;
    return propertyService.getAllOffers(+page, +limit);
  }

  async getPropertyById({ query }: ControllerConfig<{}, GetPropertyByIdParams>) {
    const propertyService = container.resolve<PropertyService>('propertyService')
    const { propertyId } = query;
    const property = await propertyService.getPropertyWithOwnerByPropertyId(propertyId);
    if (!property) throw new HttpException("The property was not found", 404);
    return property;
  }

  async createProperty({ body, user }: ControllerConfig<CreatePropertyDto>) {
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
    const userId = user?.userId;
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
    return { message: 'The property has been created successfully.' };
  }

  async updatePropertyById({ query, body }: ControllerConfig<UpdatePropertyDto, UpdatePropertyParams>) {
    const propertyService = container.resolve<PropertyService>('propertyService');
    const property = await propertyService.getPropertyById(query.propertyId);
    if (!property) throw new HttpException("The property was not found", 404);
    if (body.propertyTypeId) {
      const propertyType = await propertyService.getPropertyTypeById(body.propertyTypeId);
      if (!propertyType) throw new HttpException('The property type was not found', 404);
    }
    if (body.propertyStatusId) {
      const propertyStatus = await propertyService.getPropertyStatusById(body.propertyStatusId);
      if (!propertyStatus) throw new HttpException('The property status was not found', 404);
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
    return { message: 'The property has been updated successfully.' };
  }
}