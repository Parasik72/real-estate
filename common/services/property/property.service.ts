import Router from 'next/router';
import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { PropertyModel } from "./property.model";
import type { GetAllOffersParams, PropertiesPageResponse } from "./property-http.types";
import { PropertyAddressModel } from "./property-address.model";
import { UserModel } from "../user/user.model";
import { AddPropertyDto } from "./dto/add-property.dto";
import { EditPropertyDto } from "./dto/edit-roperty.dto";
import { schema } from "normalizr";
import { call } from "redux-saga/effects";
import { generateQueryString } from "@/common/functions/http.functions";
import { ReducerMethods } from "@/common/store/reducer.methods";
import { Entities } from "@/common/store/entities/entities.enum";
import { FRONT_PATHS } from '@/common/constants/front-paths.constants';
import IContextContainer from '@/common/context/icontext-container';
import action from '@/common/decorators/action.decorator';

export enum PropertyEffectActions {
    GET_LAST_OFFERS = 'properties_getLastOffers',
    GET_ALL_OFFERS = 'properties_getAllOffers',
    GET_PROPERTY = 'properties_getPropertyById',
    ADD_PROPERTY = 'properties_addProperty',
    EDIT_PROPERTY = 'properties_editProperty',
    GET_USER_PROPERTIES = 'properties_getUserProperties'
}

export class PropertyService extends HttpService {
    constructor(ctx: IContextContainer) {
        super(ctx);
        const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
        const userSchema = new schema.Entity('users', {}, { idAttribute: 'userId' });
        this.initSchema(
            'properties',
            { PropertyImages: [propertyImageSchema], User: userSchema }, 
            { idAttribute: 'propertyId' }
        );
    }

    @action()
    public *getLastOffers() {
        yield call(
            this.get<(PropertyModel & { PropertyAddress: PropertyAddressModel; })[]>, 
            { 
                url: BACK_PATHS.getLastOffers,
                cleanEntities: [Entities.Property, Entities.PropertyImage] 
            },
            ReducerMethods.UPDATE
        );
    }

    @action()
    public *getAllOffers(payload: GetAllOffersParams) {
        const queryStr = generateQueryString(payload);
        yield call(
            this.get<PropertiesPageResponse>, 
            { 
                url: `${BACK_PATHS.getAllOffers}${queryStr}`,
                cleanEntities: payload.page === 1 
                    ? [Entities.Property, Entities.PropertyImage] 
                    : []
            },
            ReducerMethods.UPDATE
        );
    }

    @action()
    public *getUserProperties(payload: {
        userId: string, page?: number, limit?: number
    }) {
        const queryStr = generateQueryString({ page: payload.page, limit: payload.limit });
        yield call(
            this.get<PropertiesPageResponse>, 
            { 
                url: `${BACK_PATHS.getUserProperties
                    .replace(':userId', payload.userId)}${queryStr}`,
                cleanEntities: payload.page === 1 
                    ? [Entities.Property, Entities.PropertyImage] 
                    : []
            },
            ReducerMethods.UPDATE
        );
    }

    @action()
    public *getPropertyById(payload: string) {
        yield call (
            this.get<PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel}>, 
            { 
                url: BACK_PATHS.getPropertyById.replace(':propertyId', payload),
                cleanEntities: [Entities.PropertyImage]
            },
            ReducerMethods.UPDATE
        );
    }

    @action()
    public *addProperty(payload: {
        values: AddPropertyDto
    }) {
        const res: { property: PropertyModel } = yield call(
            this.post<FormData, {property: PropertyModel}>, 
            { url: BACK_PATHS.addProperty,
                body: this.toFormData(payload.values) 
            },
            ReducerMethods.UPDATE
        );
        if (res instanceof Error) return;
        Router.push(FRONT_PATHS.offerById.replace(':propertyId', res.property.propertyId));
    }

    @action()
    public *editProperty(payload: {
        values: EditPropertyDto, 
        property: PropertyModel, 
        propertyImagesIds: string[],
        newImages: FileList | null
    }) {
        if (payload.propertyImagesIds.length > 0 &&
            payload.values.imgsToDeleteIds?.length === payload.propertyImagesIds.length) return;
        const data: EditPropertyDto = {...payload.values};
        Object.entries(payload.values).forEach((value) => {
            if (value[1] === payload.property[value[0] as keyof typeof payload.property]) {
                delete data[value[0] as keyof typeof data];
            } else if (payload.property?.PropertyAddress
                && value[1] as any === payload.property!.PropertyAddress[value[0] as keyof PropertyAddressModel]) {
                    delete data[value[0] as keyof typeof data];
            } else if (Array.isArray(value[1]) && value[1].length === 0) {
                delete data[value[0] as keyof typeof data];
            }
        });
        if (payload.newImages) data['images'] = payload.newImages;
        else delete data['images'];
        if (Object.values(data).length === 0) {
            return Router.push(FRONT_PATHS.offerById.replace(':propertyId', payload.property.propertyId));
        }
        const res: Object = yield call(
            this.patch<FormData, { message: string }>, 
            { 
                url: BACK_PATHS.editProperty.replace(':propertyId', payload.property.propertyId),
                body: this.toFormData(data)
            },
            ReducerMethods.UPDATE
        );
        if (res instanceof Error) return;
        Router.push(FRONT_PATHS.offerById.replace(':propertyId', payload.property.propertyId));
    }
}