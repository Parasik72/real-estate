import { Property } from "@/db/models/property";
import { PropertyAddress } from "@/db/models/propertyaddress";
import { PropertyStatus } from "@/db/models/propertystatus";
import { PropertiesPage, UpdateProperty, UpdatePropertyAddress } from "../types/properties.types";
import { User } from "@/db/models/user";
import { PropertyType } from "@/db/models/propertytype";
import { InferCreationAttributes } from "sequelize";

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

    async getAllOffers(page: number, limit: number): Promise<PropertiesPage> {
        const totalCount = await Property.count();
        const offset = (page - 1) * limit;
        const properties = await Property.findAll({
            order: [['updatedAt', 'DESC']],
            offset,
            limit,
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
        return {
            page,
            limit,
            offset,
            totalPages: Math.ceil(totalCount / limit),
            properties
        };
    }

    async getPropertyWithOwnerByPropertyId(propertyId: string): Promise<Property & { User: User } | null> {
        return Property.findOne({ 
            where: { propertyId }, 
            include: [
                { model: User, attributes: { exclude: ['password'] } },
                { model: PropertyAddress },
                { model: PropertyType },
            ] 
        }) as Promise<Property & { User: User } | null>;
    }

    async getPropertyById(propertyId: string): Promise<Property | null> {
        return Property.findByPk(propertyId);
    }

    async getPropertiesByUserId(userId: string): Promise<Property[]> {
        return Property.findAll({
            where: { userId }
        });
    }

    async getPropertyTypeById(propertyTypeId: string): Promise<PropertyType | null> {
        return PropertyType.findByPk(propertyTypeId);
    }

    async getPropertyStatusById(propertyStatusId: string): Promise<PropertyStatus | null> {
        return PropertyStatus.findByPk(propertyStatusId);
    }

    async createProperty(data: InferCreationAttributes<Property>): Promise<Property> {
        return Property.create(data);
    }

    async createPropertyAddress(data: InferCreationAttributes<PropertyAddress>)
    : Promise<PropertyAddress> {
        return PropertyAddress.create(data);
    }

    async updatePropertyAddressById(data: UpdatePropertyAddress, propertyAddressId: string) {
        return PropertyAddress.update(data, { where: { propertyAddressId } });
    }

    async updatePropertyById(data: UpdateProperty, propertyId: string) {
        return Property.update(data, { where: { propertyId }});
    }
}