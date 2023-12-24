import { LocationMarkIcon } from "@/common/icons/location-mark.icon"
import { SearchIcon } from "@/common/icons/search.icon"
import { FC } from "react";
import clsx from "clsx";
import { Input } from "../form/input.component";
import { PropertyTypes } from "@/common/types/property.type";
import { useRouter } from "next/router";
import Link from "next/link";
import { generateQueryString } from "@/common/functions/http.functions";
import { FRONT_PATHS } from "@/common/constants/front-paths.constants";
import { Filters } from "@/common/store/filters/filters.enum";

interface IProps {
  className?: string;
}

export const FormSearch: FC<IProps> = ({ className }) => {
  const router = useRouter();
  const queryString = generateQueryString(router.query);
  return (
    <div>
      <div className={clsx("flex flex-col lg:flex-row lg:inline-flex gap-4 rounded-md bg-indigo-50 relative z-10", className)}>
        <Input filterName={Filters.AllOffersFilter} type="select" title="Property Type" name="propertyType" className="w-full text-blue-950 border-blue-900 lg:w-56">
          {Object.values(PropertyTypes).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </Input>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LocationMarkIcon />
          </div>
          <Input filterName={Filters.AllOffersFilter} name="country" placeholder="Search of country" className="pl-10" type="text" />
        </div>
        <Link 
          href={`${FRONT_PATHS.offers}${queryString ? queryString : ''}`}
          className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-5">
            <SearchIcon />
          </div>
          <span
           className="block py-4 w-full lg:w-auto px-11 pl-13 bg-blue-900 text-white rounded-md font-bold"
          >
            Search
          </span>
        </Link>
      </div>
    </div>
  )
}