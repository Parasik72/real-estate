import { LocationMarkIcon } from "@/common/icons/location-mark.icon"
import { SearchIcon } from "@/common/icons/search.icon"
import { Select } from "../form/select.component"
import { FC } from "react";
import clsx from "clsx";
import { Input } from "../form/input.component";

interface IProps {
  className?: string;
}

export const FormSearch: FC<IProps> = ({ className }) => {
    return (
      <form action="">
        <div className={clsx("flex flex-col lg:flex-row lg:inline-flex gap-4 rounded-md bg-indigo-50 relative z-10", className)}>
          <Select title="Property Type" name="Property Type" className="w-full text-blue-950 border-blue-900 lg:w-56">
            <option value="">Property Type</option>
          </Select>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LocationMarkIcon />
            </div>
            <Input placeholder="Search of location" className="pl-10" type="text" />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5">
              <SearchIcon />
            </div>
            <button className="py-4 w-full lg:w-auto px-11 pl-13 bg-blue-900 text-white rounded-md font-bold">Search</button>
          </div>
        </div>
      </form>
    )
}