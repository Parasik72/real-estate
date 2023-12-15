import { propertyService } from "@/common/services/property/property.service";

export default [
    propertyService.getLastOffers(),
    propertyService.addProperty(),
    propertyService.editProperty(),
    propertyService.getAllOffers(),
    propertyService.getPropertyById(),
    propertyService.getUserProperties(),
];