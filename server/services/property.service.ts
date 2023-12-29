import * as Types from "../types/properties.types";
import { UUID } from "crypto";
import { v4 } from "uuid";
import { PROPERTY_IMGS_PATH } from "../constants/path.constants";
import { 
    OFFERS_LIMIT_DEFAULT, 
    OFFERS_PAGE_DEFAULT, 
    PROPERTIES_LIMIT_DEFAULT, 
    PROPERTIES_PAGE_DEFAULT 
} from "../constants/property.constants";
import { GetAllPropertiesParams } from "../params/property.params";
import { allOffersPAWhereOptions, allOffersWhereOptions } from "../functions/property.functions";
import BaseContext from "../context/base-context";
import { IUser } from "../types/user.types";
import { Includeable, InferAttributes, InferCreationAttributes, Order } from "sequelize";
import { getModelPage } from "../functions/model.functions";
import { IPager } from "../types/controller.types";
import { DealStatuses } from "../types/deal.type";
import { CreatePropertyDto } from "../dto/property/create-property.dto";
import { UpdatePropertyDto } from "../dto/property/update-property.dto";

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

    async getAllOffers(params: GetAllPropertiesParams)
    : Promise<IPager<Types.IProperty>> {
        const page = Number(params.page || OFFERS_PAGE_DEFAULT);
        const limit = Number(params.limit || OFFERS_LIMIT_DEFAULT);
        const mainWhere = allOffersWhereOptions(params);
        const propertyAddressWhere = allOffersPAWhereOptions(params);
        const countOptions = {
            where: mainWhere,
            include: [
                {
                    model: this.di.PropertyAddress,
                    where: propertyAddressWhere
                }
            ]  
        };
        const findAllOptions = {
            order: [['updatedAt', 'DESC']] as Order,
            limit,
            where: mainWhere,
            include: [
                {
                    model: this.di.PropertyAddress,
                    where: propertyAddressWhere
                },
                { model: this.di.PropertyImage, limit: 1 }
            ] 
        };
        const pageName = Types.PropertyPaginationNames.AllOffersPage;
        return getModelPage(this.di.Property, page, limit, pageName, countOptions, findAllOptions, params);
    }

    async getUserProperties(userId: string, page?: string, limit?: string)
    : Promise<IPager<Types.IProperty>> {
        const currentPage = Number(page || PROPERTIES_PAGE_DEFAULT);
        const currentLimit = Number(limit || PROPERTIES_LIMIT_DEFAULT);
        const countOptions = { where: { userId } };
        const findAllOptions = {
            order: [['updatedAt', 'DESC']] as Order,
            limit: currentLimit,
            where: { userId },
            include: [
                { model: this.di.PropertyAddress },
                { model: this.di.PropertyImage, limit: 1 }
            ]
        };
        const pageName = Types.PropertyPaginationNames.UserPropertiesPage;
        return getModelPage(this.di.Property, currentPage, currentLimit, pageName, countOptions, findAllOptions, {});
    }

    async getPropertyWithOwnerByPropertyId(propertyId: string, user?: IUser)
    : Promise<Types.IProperty & { User: IUser } | null> {
        const include: Includeable[] = [
            { model: this.di.User, attributes: { exclude: ['password'] } },
            { model: this.di.PropertyAddress },
            { model: this.di.PropertyImage },
        ];
        if (user) {
            include.push({
                model: this.di.Deal,
                where: { dealStatus: DealStatuses.Awaiting, buyerUserId: user.userId },
                limit: 1
            });
        }
        return this.di.Property.findOne({ 
            where: { propertyId }, 
            include 
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

    async createProperty(data: CreatePropertyDto, user: IUser, files: Express.Multer.File[]): Promise<Types.IProperty> {
        const propertyAddress = await this.createPropertyAddress({
          countryName: data.countryName,
          cityName: data.cityName,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
        });
        const propertyId = v4() as UUID;
        const userId = user?.userId as UUID;
        const time = BigInt(new Date().getTime());
        const property = await this.di.Property.create({
            ...data,
            propertyId,
            userId,
            propertyAddressId: propertyAddress.propertyAddressId,
            createdAt: time,
            updatedAt: time,
          });
        await this.createPropertyImages(propertyId, files!);
        return property;
    }

    async createPropertyAddress(data: Types.CreatePropertyAddress)
    : Promise<Types.IPropertyAddress> {
        const propertyAddressId = v4() as UUID;
        return this.di.PropertyAddress.create({
            ...data,
            propertyAddressId
        });
    }

    async updatePropertyAddressById(data: Types.UpdatePropertyAddress, propertyAddressId: string) {
        return this.di.PropertyAddress.update(data, { where: { propertyAddressId } });
    }

    async updatePropertyById(
        data: UpdatePropertyDto, 
        property: Types.IProperty,
        files: Express.Multer.File[] | undefined
    ) {
        if (data.propertyStatus) {
          await this.di.DealService.updateDealsByPropertyIdAndStatusId({ 
            dealStatus: DealStatuses.Canceled,
            updatedAt: BigInt(new Date().getTime())
          }, property.propertyId, DealStatuses.Awaiting);
        }
        await this.updatePropertyAddressById({
          countryName: data.countryName,
          cityName: data.cityName,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
        }, property.propertyAddressId);
        await this.di.Property.update({
          area: data.area,
          bathRooms: data.bathRooms,
          bedRooms: data.bedRooms,
          title: data.title,
          description: data.description,
          priceAmount: data.priceAmount,
          propertyStatus: data.propertyStatus,
          propertyType: data.propertyType,
          updatedAt: BigInt(new Date().getTime())
        }, { where: { propertyId: property.propertyId }});
        if (data.imgsToDeleteIds) {
          await this.deletePropertyImages(data.imgsToDeleteIds, property.propertyId);
        } 
        if (files) await this.createPropertyImages(property.propertyId, files!);
    }

    async changePropertyOwnerById(data: Types.ChangePropertyOwner, propertyId: string) {
        return this.di.Property.update(
            {...data, propertyStatus: Types.PropertyStatuses.Awaiting }, 
            { where: { propertyId }}
        );
    }

    async createPropertyImages(propertyId: UUID, images: Express.Multer.File[]) {
        const { FileUploaderService } = this.di;
        const propertyImages: InferAttributes<Types.IPropertyImage>[] = [];
        images.forEach((image) => {
            const propertyImageId = v4();
            const imgName = FileUploaderService.uploadFile(image, PROPERTY_IMGS_PATH);
            propertyImages.push({
                propertyId,
                imgName,
                propertyImageId
            });
        })
        return this.di.PropertyImage.bulkCreate(propertyImages);
    }

    async deletePropertyImages(propertyImageIds: string[], propertyId: string) {
        const { FileUploaderService } = this.di;
        const propertyImages = await this.di.PropertyImage.findAll({
            where: { propertyImageId: propertyImageIds, propertyId }
        });
        const propertyImagesIds: string[] = [];
        propertyImages.forEach((propertyImage) => {
            FileUploaderService.deleteFile(propertyImage.imgName, PROPERTY_IMGS_PATH);
            propertyImagesIds.push(propertyImage.propertyImageId);
        });
        await this.di.PropertyImage.destroy({
            where: { propertyImageId: propertyImagesIds }
        });
    }
}