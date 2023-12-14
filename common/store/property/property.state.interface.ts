import { PropertyModel } from "@/common/services/property/property.model";
import { StoreEntity } from "../types/store.types";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { IPagination } from "@/common/types/common.types";

export interface PropertyState {
    entities: {
        properties: StoreEntity<PropertyModel>;
        propertyImages: StoreEntity<PropertyImageModel>;
    },
    paginations: {
        allOffers?: IPagination;
    }
}