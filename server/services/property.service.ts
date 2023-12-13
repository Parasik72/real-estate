import * as Types from "../types/properties.types";
import { UUID } from "crypto";
import { v4 } from "uuid";
import { PROPERTY_IMGS_PATH } from "../constants/path.constants";
import { OFFERS_LIMIT_DEFAULT, OFFERS_PAGE_DEFAULT } from "../constants/property.constants";
import { GetAllPropertiesParams } from "../params/property.params";
import { allOffersPAWhereOptions, allOffersWhereOptions } from "../functions/property.functions";
import BaseContext from "../context/base-context";
import { IUser } from "../types/user.types";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export class PropertyService extends BaseContext {
    async getLastOffers(): Promise<Types.IProperty[]> {
        return this.di.Property.findAll({ 
            limit: OFFERS_LIMIT_DEFAULT,
            order: [['updatedAt', 'DESC']],
            where: {
                propertyStatus: Types.PropertyStatuses.ForSale
            },
            include: [
                { model: this.di.PropertyAddress },
                { model: this.di.PropertyImage, limit: 1 }
            ]
        });
    }

    async getAllOffers(params: GetAllPropertiesParams): Promise<Types.PropertiesPage> {
        const page = Number(params.page || OFFERS_PAGE_DEFAULT);
        const limit = Number(params.limit || OFFERS_LIMIT_DEFAULT);
        const mainWhere = allOffersWhereOptions(params);
        const propertyAddressWhere = allOffersPAWhereOptions(params);
        const totalCount = await this.di.Property.count({
            where: mainWhere,
            include: [
                {
                    model: this.di.PropertyAddress,
                    where: propertyAddressWhere
                }
            ]  
        });
        const offset = (page - 1) * limit;
        const properties = await this.di.Property.findAll({
            order: [['updatedAt', 'DESC']],
            offset,
            limit,
            where: mainWhere,
            include: [
                {
                    model: this.di.PropertyAddress,
                    where: propertyAddressWhere
                },
                { model: this.di.PropertyImage, limit: 1 }
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

    async getPropertyWithOwnerByPropertyId(propertyId: string)
    : Promise<Types.IProperty & { User: IUser } | null> {
        return this.di.Property.findOne({ 
            where: { propertyId }, 
            include: [
                { model: this.di.User, attributes: { exclude: ['password'] } },
                { model: this.di.PropertyAddress },
                { model: this.di.PropertyImage },
            ] 
        }) as Promise<Types.IProperty & { User: IUser } | null>;
    }

    async getPropertyWithOwnerAndStatusByPropertyId(propertyId: string)
    : Promise<Types.IProperty & { User: IUser } | null> {
        return this.di.Property.findOne({ 
            where: { propertyId }, 
            include: [
                { model: this.di.User, attributes: { exclude: ['password'] } },
            ] 
        }) as Promise<Types.IProperty & { User: IUser } | null>;
    }

    async getPropertyById(propertyId: string): Promise<Types.IProperty | null> {
        return this.di.Property.findByPk(propertyId);
    }

    async getPropertiesByUserId(userId: string): Promise<Types.IProperty[]> {
        return this.di.Property.findAll({
            where: { userId }
        });
    }

    async createProperty(data: InferCreationAttributes<Types.IProperty>): Promise<Types.IProperty> {
        return this.di.Property.create(data);
    }

    async createPropertyAddress(data: InferCreationAttributes<Types.IPropertyAddress>)
    : Promise<Types.IPropertyAddress> {
        return this.di.PropertyAddress.create(data);
    }

    async updatePropertyAddressById(data: Types.UpdatePropertyAddress, propertyAddressId: string) {
        return this.di.PropertyAddress.update(data, { where: { propertyAddressId } });
    }

    async updatePropertyById(data: Types.UpdateProperty, propertyId: string) {
        return this.di.Property.update(data, { where: { propertyId }});
    }

    async changePropertyOwnerById(data: Types.ChangePropertyOwner, propertyId: string) {
        return this.di.Property.update(
            {...data, propertyStatus: Types.PropertyStatuses.Awaiting }, 
            { where: { propertyId }}
        );
    }

    async createPropertyImages(propertyId: UUID, images: Express.Multer.File[]) {
        const { fileUploaderService } = this.di;
        const propertyImages: InferAttributes<Types.IPropertyImage>[] = [];
        images.forEach((image) => {
            const propertyImageId = v4();
            const imgName = fileUploaderService.uploadFile(image, PROPERTY_IMGS_PATH);
            propertyImages.push({
                propertyId,
                imgName,
                propertyImageId
            });
        })
        return this.di.PropertyImage.bulkCreate(propertyImages);
    }

    async deletePropertyImages(propertyImageIds: string[], propertyId: string) {
        const { fileUploaderService } = this.di;
        const propertyImages = await this.di.PropertyImage.findAll({
            where: { propertyImageId: propertyImageIds, propertyId }
        });
        const propertyImagesIds: string[] = [];
        propertyImages.forEach((propertyImage) => {
            fileUploaderService.deleteFile(propertyImage.imgName, PROPERTY_IMGS_PATH);
            propertyImagesIds.push(propertyImage.propertyImageId);
        });
        await this.di.PropertyImage.destroy({
            where: { propertyImageId: propertyImagesIds }
        });
    }
}