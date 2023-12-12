import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { PropertyModel } from "./property.model";
import { PropertiesPageResponse } from "./property-http.types";
import { PropertyAddressModel } from "./property-address.model";
import { UserModel } from "../user/user.model";
import { AddPropertyDto } from "./dto/add-property.dto";
import { EditPropertyDto } from "./dto/edit-roperty.dto";

class PropertyService extends HttpService {
    async getLastOffers()
    : Promise<(PropertyModel & { PropertyAddress: PropertyAddressModel; })[] | null> {
        const data = await this.get<(PropertyModel & { PropertyAddress: PropertyAddressModel; })[]>({
            url: BACK_PATHS.getLastOffers
        });
        if (!data) return null;
        return data;
    }

    async getAllOffers()
    : Promise<(PropertyModel & { PropertyAddress: PropertyAddressModel; })[] | null> {
        const data = await this.get<PropertiesPageResponse>({
            url: BACK_PATHS.getAllOffers
        });
        if (!data) return null;
        return data.properties;
    }

    async getPropertyById(id: string)
    : Promise<PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel} | null> {
        const data = await this.get<PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel}>({
            url: BACK_PATHS.getPropertyById
                .replace(':propertyId', id)
        });
        if (!data) return null;
        return data;
    }

    async addProperty(dto: AddPropertyDto) {
        return this.post<FormData, { propertyId: string }>({
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