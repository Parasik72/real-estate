import { LocationMarkIcon } from "@/common/icons/location-mark.icon"
import { SearchIcon } from "@/common/icons/search.icon"
import clsx from "clsx";
import { Input } from "../form/input.component";
import { PropertyTypes } from "@/common/types/property.type";
import Link from "next/link";
import { generateQueryString } from "@/common/functions/http.functions";
import { FRONT_PATHS } from "@/common/constants/front-paths.constants";
import { Paginations } from "@/common/store/paginations/paginations.enum";
import { IPagination } from "@/common/types/common.types";
import { RootState } from "@/common/store/root.reducer";
import { connect } from "react-redux";

interface IProps {
  className?: string;
}

interface IState {
  allOffersPage: IPagination;
}

function mapStateToProps(state: RootState): IState {
  return { 
      allOffersPage: state.allOffersPage,
  };
}

const FormSearchComponent = ({ className, allOffersPage }: IProps & IState) => {
  const queryString = generateQueryString(allOffersPage.query || {});
  return (
    <div>
      <div className={clsx("flex flex-col lg:flex-row lg:inline-flex gap-4 rounded-md bg-indigo-50 relative z-10", className)}>
        <Input paginationName={Paginations.AllOffersPage} type="select" title="Property Type" name="propertyType" className="w-full text-blue-950 border-blue-900 lg:w-56">
          {Object.values(PropertyTypes).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </Input>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LocationMarkIcon />
          </div>
          <Input paginationName={Paginations.AllOffersPage} name="country" placeholder="Search of country" className="pl-10" type="text" />
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

export const FormSearch = connect(mapStateToProps, null)(FormSearchComponent);