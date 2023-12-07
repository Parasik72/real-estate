import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { PropertyModel } from "./property.model";
import { PropertiesPageResponse } from "./property-http.types";
import { PropertyAddressModel } from "./property-address.model";
import { UserModel } from "../user/user.model";

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
}

export const propertyService = new PropertyService;