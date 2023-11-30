import { NextApiRequest, NextApiResponse } from "next";
import container from "../container";
import { PropertyService } from "../services/property.service";
import { HttpException } from "../exceptions/http.exception";
import { INextApiRequestExtended } from "../types/http.types";
import { GetAllPropertiesParams, GetPropertyByIdParams } from "../params/property.params";

export class PropertyController {
  async getLastOffers(req: NextApiRequest, res: NextApiResponse) {
    const propertyService = container.resolve<PropertyService>('propertyService');
    const properties = await propertyService.getLastOffers();
    res.status(200).json(properties);
  }

  async getAllProperties(req: INextApiRequestExtended<{}, GetAllPropertiesParams>, res: NextApiResponse) {
    const propertyService = container.resolve<PropertyService>('propertyService');
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const propertiesPage = await propertyService.getAllProperties(+page, +limit);
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
}