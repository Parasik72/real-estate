import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { PropertyModel } from "./property.model";
import { PropertiesPageResponse } from "./property-http.types";
import { PropertyAddressModel } from "./property-address.model";
import { UserModel } from "../user/user.model";
import { AddPropertyDto } from "./dto/add-property.dto";

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
        const formData = new FormData;
        Object.entries(dto).map((value) => {
            if (value[1] instanceof FileList) {
                for(let i = 0; i < value[1].length; ++i) {
                    formData.append(`${value[0]}`, value[1].item(i) || '');
                }
            } else {
                formData.append(value[0], value[1]);
            }
        });
        return this.post<FormData, { propertyId: string }>({
            url: BACK_PATHS.addProperty,
            body: formData
        });
    }
}

export const propertyService = new PropertyService;