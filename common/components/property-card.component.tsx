import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo } from "react";
import { PropertyModel } from "../services/property/property.model";
import CardImg from '../../common/images/card-img-1.png';
import { StoreEntity } from "../store/types/store.types";
import { PropertyImageModel } from "../services/property/property-image.model";
import { FRONT_IMGS_PATH } from "../constants/front-paths.constants";

interface IProps {
  property: PropertyModel;
  propertyImagesStore: StoreEntity<PropertyImageModel>;
  className?: string;
}

export const PropertyCard: FC<IProps> = ({
  property,
  propertyImagesStore,
  className
}) => {
  const imgId = useMemo(() => propertyImagesStore.allIds.find((item) => {
    return propertyImagesStore.byId[item].propertyId === property.propertyId;
  }), [propertyImagesStore.allIds, property.propertyId]);
  const imgPath = useMemo(() => imgId 
    ? FRONT_IMGS_PATH.property.replace(':imgName', propertyImagesStore.byId[imgId].imgName)
    : CardImg, [CardImg, FRONT_IMGS_PATH, imgId, propertyImagesStore.byId]) ;
  return (
    <Link 
      href={`/offers/${property.propertyId}`} 
      className={clsx("block bg-white shadow-lg rounded-md w-full h-full flex-shrink-0", className)}
    >
      <div className="max-h-64">
        <Image 
          className="bg-indigo-100 h-64 max-h-64 w-full object-cover object-center rounded-md" 
          src={imgPath} 
          alt={property.title} 
          height={249} 
          width={444} 
        />
      </div>
      <div className="p-4 flex flex-col gap-4">
        <h3 className="text-dark-blue text-1.5xl leading-8 font-bold">
          {property.title}
        </h3>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-blue-900">{property.priceAmount}$</span>
          <span className="text-dark-blue">
            {`${property.PropertyAddress?.countryName}, ${property.PropertyAddress?.cityName}`}
          </span>
        </div>
      </div>
    </Link>
  );
};