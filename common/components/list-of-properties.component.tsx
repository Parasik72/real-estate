import { PropertyCard } from "./property-card.component";
import { PropertyModel } from "../services/property/property.model";
import { FC } from "react";
import { Entity } from "../store/types/store.types";
import { PropertyImageModel } from "../services/property/property-image.model";
import { IPagination } from "../types/common.types";

interface IProps {
    properties: PropertyModel[];
    propertyImages: Entity<PropertyImageModel>;
    pagination: IPagination;
    onShowNext?: (nextPage: number) => void;
}

export const ListOfProperties: FC<IProps> = ({ 
    properties, 
    pagination, 
    propertyImages,
    onShowNext
}) => (
    <div className="flex flex-wrap justify-center md:justify-start -mx-4">
        {properties.map((property) => (
            <div key={property.propertyId} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <PropertyCard property={property} propertyImages={propertyImages} />
            </div>
        ))}
        {pagination.currentPage && pagination.totalPages && onShowNext && pagination?.currentPage < pagination.totalPages && (
            <div className="w-full flex justify-center">
                <button 
                    onClick={() => onShowNext(pagination!.currentPage! + 1)} 
                    className="mt-4 py-3 px-4 text-blue-900 border-2 border-blue-900 rounded-md font-bold"
                >
                    Show next
                </button>
            </div>
        )}
    </div>
);