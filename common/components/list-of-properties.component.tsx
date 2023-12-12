import { PropertyCard } from "./property-card.component";
import { PropertyModel } from "../services/property/property.model";
import { FC } from "react";
import { StoreEntity } from "../store/types/store.types";
import { PropertyImageModel } from "../services/property/property-image.model";

interface IProps {
    properties: PropertyModel[];
    propertyImagesStore: StoreEntity<PropertyImageModel>;
}

export const ListOfProperties: FC<IProps> = ({ properties, propertyImagesStore }) => (
    <div className="flex flex-wrap justify-center md:justify-start -mx-4">
        {properties.map((property, i) => (
            <div key={property.propertyId} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <PropertyCard property={property} propertyImagesStore={propertyImagesStore} />
            </div>
        ))}
        <div className="w-full flex justify-center">
            <button className="mt-4 py-3 px-4 text-blue-900 border-2 border-blue-900 rounded-md font-bold">
                Show next
            </button>
        </div>
    </div>
);