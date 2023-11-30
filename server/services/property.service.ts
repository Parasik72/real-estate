import { Property } from "@/db/models/property";
import { PropertyAddress } from "@/db/models/propertyaddress";
import { PropertyStatus } from "@/db/models/propertystatus";
import { PropertiesPage } from "../types/properties.types";

export class PropertyService {
    async getLastOffers(): Promise<Property[]> {
        return Property.findAll({ 
            limit: 12,
            order: [['updatedAt', 'DESC']],
            include: [
                { 
                    model: PropertyStatus,
                    where: {
                        statusName: 'For sale'
                    }
                },
                { model: PropertyAddress }
            ]
        });
    }

    async getAllProperties(page: number, limit: number): Promise<PropertiesPage> {
        const totalCount = await Property.count();
        const offset = (page - 1) * limit;
        const properties = await Property.findAll({
            offset,
            limit,
            include: [{ model: PropertyAddress }] 
        });
        return {
            page,
            limit,
            offset,
            totalPages: Math.ceil(totalCount / limit),
            properties
        };
    }

    async getPropertyById(propertyId: string): Promise<Property | null> {
        return Property.findByPk(propertyId);
    }
}