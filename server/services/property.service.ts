import { Property } from "@/db/models/property";
import { PropertyAddress } from "@/db/models/propertyaddress";
import { PropertyStatus } from "@/db/models/propertystatus";
import { 
    ChangePropertyOwner, 
    PropertiesPage, 
    PropertyStatuses, 
    UpdateProperty, 
    UpdatePropertyAddress 
} from "../types/properties.types";
import { User } from "@/db/models/user";
import { PropertyType } from "@/db/models/propertytype";
import { InferAttributes, InferCreationAttributes, Op, WhereOptions } from "sequelize";
import { PropertyImage } from "@/db/models/propertyimage";
import { UUID } from "crypto";
import { v4 } from "uuid";
import { FileUploaderService } from "./file-uploader.service";
import container from "../container";
import { PROPERTY_IMGS_PATH } from "../constants/path.constants";
import { OFFERS_LIMIT_DEFAULT, OFFERS_PAGE_DEFAULT } from "../constants/property.constants";
import { GetAllPropertiesParams } from "../params/property.params";
import { allOffersPropertyAddressWhereOptions, allOffersWhereOptions } from "../functions/property.functions";

export class PropertyService {
    async getLastOffers(): Promise<Property[]> {
        return Property.findAll({ 
            limit: OFFERS_LIMIT_DEFAULT,
            order: [['updatedAt', 'DESC']],
            include: [
                { 
                    model: PropertyStatus,
                    where: {
                        statusName: PropertyStatuses.ForSale
                    }
                },
                { model: PropertyAddress }
            ]
        });
    }

    async getAllOffers(params: GetAllPropertiesParams): Promise<PropertiesPage> {
        const page = Number(params.page || OFFERS_PAGE_DEFAULT);
        const limit = Number(params.limit || OFFERS_LIMIT_DEFAULT);
        const mainWhere = allOffersWhereOptions(params);
        const propertyAddressWhere = allOffersPropertyAddressWhereOptions(params);
        const totalCount = await Property.count({
            where: mainWhere,
            include: [
                { 
                    model: PropertyStatus,
                    where: {
                        statusName: PropertyStatuses.ForSale
                    }
                },
                {
                    model: PropertyAddress,
                    where: propertyAddressWhere
                }
            ]  
        });
        const offset = (page - 1) * limit;
        const properties = await Property.findAll({
            order: [['updatedAt', 'DESC']],
            offset,
            limit,
            where: mainWhere,
            include: [
                { 
                    model: PropertyStatus,
                    where: {
                        statusName: PropertyStatuses.ForSale
                    }
                },
                {
                    model: PropertyAddress,
                    where: propertyAddressWhere
                }
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

    async getPropertyWithOwnerAndStatusByPropertyId(propertyId: string)
    : Promise<Property & { User: User, PropertyStatus: PropertyStatus } | null> {
        return Property.findOne({ 
            where: { propertyId }, 
            include: [
                { model: User, attributes: { exclude: ['password'] } },
                { model: PropertyStatus },
            ] 
        }) as Promise<Property & { User: User, PropertyStatus: PropertyStatus } | null>;
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

    async changePropertyOwnerById(data: ChangePropertyOwner, propertyId: string) {
        return Property.update(data, { where: { propertyId }});
    }

    async createPropertyImages(propertyId: UUID, images: Express.Multer.File[]) {
        const fileUploaderService = container.resolve<FileUploaderService>('fileUploaderService');
        const propertyImages: InferCreationAttributes<PropertyImage>[] = [];
        images.forEach((image) => {
            const propertyImageId = v4();
            const imgName = fileUploaderService.uploadFile(image, PROPERTY_IMGS_PATH);
            propertyImages.push({
                propertyId,
                imgName,
                propertyImageId
            });
        })
        return PropertyImage.bulkCreate(propertyImages);
    }

    async deletePropertyImages(propertyImageIds: string[]) {
        const fileUploaderService = container.resolve<FileUploaderService>('fileUploaderService');
        const propertyImages = await PropertyImage.findAll({
            where: { propertyImageId: propertyImageIds }
        });
        propertyImages.forEach((propertyImage) => {
            fileUploaderService.deleteFile(propertyImage.imgName, PROPERTY_IMGS_PATH);
        });
    }
}