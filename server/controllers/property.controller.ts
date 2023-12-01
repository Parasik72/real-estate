import { NextApiRequest, NextApiResponse } from "next";
import container from "../container";
import { PropertyService } from "../services/property.service";
import { HttpException } from "../exceptions/http.exception";
import { INextApiRequestExtended } from "../types/http.types";
import { GetAllPropertiesParams, GetPropertyByIdParams, UpdatePropertyParams } from "../params/property.params";
import { CreatePropertyDto } from "../dto/property/create-property.dto";
import { v4 } from "uuid";
import { UUID } from "crypto";
import { UpdatePropertyDto } from "../dto/property/update-property.dto";

export class PropertyController {
  async getAllOffersServerSideProps(params: GetAllPropertiesParams) {
    const propertyService = container.resolve<PropertyService>('propertyService');
    const page = params.page || 1;
    const limit = params.limit || 12;
    const propertiesPage = await propertyService.getAllOffers(+page, +limit);
    const data = JSON.parse(JSON.stringify(propertiesPage.properties));
    return { props: { offers: data } };
  }

  async getLastOffersServerSideProps() {
    const propertyService = container.resolve<PropertyService>('propertyService');
    const lastOffers = await propertyService.getLastOffers();
    const data = JSON.parse(JSON.stringify(lastOffers));
    return { props: { offers: data } };
  }

  async getPropertyByIdServerSideProps(params: GetPropertyByIdParams) {
    const propertyService = container.resolve<PropertyService>('propertyService')
    const { propertyId } = params;
    const property = await propertyService.getPropertyWithOwnerByPropertyId(propertyId);
    if (!property) return { notFound: true };
    const data = JSON.parse(JSON.stringify({property, user: property.User}));
    return { props: data };
  }

  async getLastOffers(req: NextApiRequest, res: NextApiResponse) {
    const propertyService = container.resolve<PropertyService>('propertyService');
    const properties = await propertyService.getLastOffers();
    res.status(200).json(properties);
  }

  async getAllOffers(req: INextApiRequestExtended<{}, GetAllPropertiesParams>, res: NextApiResponse) {
    const propertyService = container.resolve<PropertyService>('propertyService');
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const propertiesPage = await propertyService.getAllOffers(+page, +limit);
    res.status(200).json(propertiesPage);
  }

  async getPropertyById(req: INextApiRequestExtended<{}, GetPropertyByIdParams>, res: NextApiResponse) {
    try {
      const propertyService = container.resolve<PropertyService>('propertyService')
      const { propertyId } = req.query;
      const property = await propertyService.getPropertyById(propertyId);
      if (!property) throw new HttpException("The property was not found", 404);
      return res.status(200).json(property)
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error of receiving the property' });
    }
  }

  async createProperty(req: INextApiRequestExtended<CreatePropertyDto>, res: NextApiResponse) {
    try {
      const propertyService = container.resolve<PropertyService>('propertyService');
      const propertyType = await propertyService.getPropertyTypeById(req.body.propertyTypeId);
      if (!propertyType) throw new HttpException('The property type was not found', 404);
      const propertyStatus = await propertyService.getPropertyStatusById(req.body.propertyStatusId);
      if (!propertyStatus) throw new HttpException('The property status was not found', 404);
      const propertyAddressId = v4() as UUID;
      await propertyService.createPropertyAddress({
        propertyAddressId,
        countryName: req.body.countryName,
        cityName: req.body.cityName,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
      });
      const propertyId = v4() as UUID;
      const userId = '75e8715e-1d9b-4f78-b136-b15b2f7913a1'; // HARD CODED!!!
      const time = BigInt(new Date().getTime());
      await propertyService.createProperty({
        ...req.body,
        propertyStatusId: propertyStatus.propertyStatusId,
        propertyTypeId: propertyType.propertyTypeId,
        propertyId,
        userId,
        propertyAddressId,
        createdAt: time,
        updatedAt: time,
      });
      return res.status(201).json({ message: 'The property has been created successfully.' });
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: `Error of creating a property: ${error}` });
    }
  }

  async updatePropertyById(
    req: INextApiRequestExtended<UpdatePropertyDto, UpdatePropertyParams>, 
    res: NextApiResponse
  ) {
    try {
      const propertyService = container.resolve<PropertyService>('propertyService');
      const property = await propertyService.getPropertyById(req.query.propertyId);
      if (!property) throw new HttpException("The property was not found", 404);
      if (req.body.propertyTypeId) {
        const propertyType = await propertyService.getPropertyTypeById(req.body.propertyTypeId);
        if (!propertyType) throw new HttpException('The property type was not found', 404);
      }
      if (req.body.propertyStatusId) {
        const propertyStatus = await propertyService.getPropertyStatusById(req.body.propertyStatusId);
        if (!propertyStatus) throw new HttpException('The property status was not found', 404);
      }
      await propertyService.updatePropertyAddressById({
        countryName: req.body.countryName,
        cityName: req.body.cityName,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
      }, property.propertyAddressId);
      await propertyService.updatePropertyById({
        area: req.body.area,
        bathRooms: req.body.bathRooms,
        bedRooms: req.body.bedRooms,
        title: req.body.title,
        description: req.body.description,
        priceAmount: req.body.priceAmount,
        propertyStatusId: req.body.propertyStatusId as UUID,
        propertyTypeId: req.body.propertyTypeId as UUID,
        updatedAt: BigInt(new Date().getTime())
      }, property.propertyId);
      return res.status(200).json({ message: 'The property has been updated successfully.' });
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error of updating the property' });
    }
  }
}