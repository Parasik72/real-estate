import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { PropertyModel } from "../services/property/property.model";
import CardImg from '../../common/images/card-img-1.png';
import { PropertyAddressModel } from "../services/property/property-address.model";

interface IProps {
  property: PropertyModel & {PropertyAddress: PropertyAddressModel};
  className?: string;
}

export const PropertyCard: FC<IProps> = ({
  property,
  className
}) => (
    <Link 
      href={`/offers/${property.propertyId}`} 
      className={clsx("block bg-white shadow-lg rounded-md w-full h-full flex-shrink-0", className)}
    >
      <Image className="bg-indigo-50 w-full object-cover object-center rounded-md" src={CardImg} alt={property.title} height={249} width={444} />
      <div className="p-4 flex flex-col gap-4">
        <h3 className="text-dark-blue text-1.5xl leading-8 font-bold">
          {property.title}
        </h3>
        <div className="flex flex-col gap-1">
          <span className="font-bold text-blue-900">{property.priceAmount}$</span>
          <span className="text-dark-blue">
            {`${property.PropertyAddress.countryName}, ${property.PropertyAddress.cityName}`}
          </span>
        </div>
      </div>
    </Link>
)