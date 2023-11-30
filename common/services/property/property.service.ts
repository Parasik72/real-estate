import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { PropertyModel, createPropertyModel } from "./property.model";
import { GetPropertyResponse, PropertiesPageResponse } from "./property-http.types";

class PropertyService extends HttpService {
    async getLastOffers(): Promise<PropertyModel[] | null> {
        const data = await this.get<GetPropertyResponse[]>({
            url: BACK_PATHS.getLastOffers
        });
        if (!data) return null;
        return data.map((item) => createPropertyModel(item));
    }

    async getAllOffers(): Promise<PropertyModel[] | null> {
        const data = await this.get<PropertiesPageResponse>({
            url: BACK_PATHS.getAllOffers
        });
        if (!data) return null;
        return data.properties.map((item) => createPropertyModel(item));
    }

    async getPropertyById(id: string): Promise<PropertyModel | null> {
        const data = await this.get<GetPropertyResponse>({
            url: BACK_PATHS.getPropertyById
                .replace(':propertyId', id)
        });
        if (!data) return null;
        return createPropertyModel(data);
    }
}

export const propertyService = new PropertyService;