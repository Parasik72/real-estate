import { PropertyModel } from "@/common/services/property/property.model";
import { StoreEntity } from "../types/store.types";

export interface PropertyState {
    entities: {
        properties: StoreEntity<PropertyModel>
    }
}