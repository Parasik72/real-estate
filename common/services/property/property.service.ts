import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { PropertyModel } from "./property.model";
import { GetAllOffersParams, PropertiesPageResponse } from "./property-http.types";
import { PropertyAddressModel } from "./property-address.model";
import { UserModel } from "../user/user.model";
import { AddPropertyDto } from "./dto/add-property.dto";
import { EditPropertyDto } from "./dto/edit-roperty.dto";
import { schema } from "normalizr";
import { call } from "redux-saga/effects";
import { generateQueryString } from "@/common/functions/http.functions";

class PropertyService extends HttpService {
    constructor() {
        super();
        const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
        const propertySchema = new schema.Entity(
            'properties', 
            { PropertyImages: [propertyImageSchema] }, 
            { idAttribute: 'propertyId' }
        )
        this.initSchema('property', propertySchema);
    }

    // *getLastOffers() {
    //     yield call(
    //         this.get<(PropertyModel & { PropertyAddress: PropertyAddressModel; })[]>, 
    //         {url: BACK_PATHS.getLastOffers}
    //     );
    // }
    async getLastOffers()
    : Promise<(PropertyModel & { PropertyAddress: PropertyAddressModel; })[] | null> {
        return this.get<(PropertyModel & { PropertyAddress: PropertyAddressModel; })[]>({
            url: BACK_PATHS.getLastOffers
        });
    }

    async getAllOffers(query: GetAllOffersParams)
    : Promise<PropertiesPageResponse | null> {
        const queryStr = generateQueryString(query);
        return this.get<PropertiesPageResponse>({
            url: `${BACK_PATHS.getAllOffers}${queryStr ? queryStr : ''}`
        });
    }

    async getUserProperties(userId: string, page?: number, limit?: number)
    : Promise<PropertiesPageResponse | null> {
        const queryStr = generateQueryString({ page, limit });
        return this.get<PropertiesPageResponse>({
            url: `${BACK_PATHS.getUserProperties
                .replace(':userId', userId)}${queryStr ? queryStr : ''}`
        });
    }

    async getPropertyById(id: string)
    : Promise<PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel} | null> {
        return this.get<PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel}>({
            url: BACK_PATHS.getPropertyById
                .replace(':propertyId', id)
        });
    }

    async addProperty(dto: AddPropertyDto): Promise<{property: PropertyModel} | null> {
        return this.post<FormData, {property: PropertyModel}>({
            url: BACK_PATHS.addProperty,
            body: this.toFormData(dto)
        });
    }

    async editProperty(dto: EditPropertyDto, propertyId: string) {
        return this.patch<FormData, { message: string }>({
            url: BACK_PATHS.editProperty.replace(':propertyId', propertyId),
            body: this.toFormData(dto)
        });
    }
}

export const propertyService = new PropertyService;