import { LocationMarkIcon } from "@/common/icons/location-mark.icon"
import { SearchIcon } from "@/common/icons/search.icon"

export const FormSearch = () => {
    return (
        <form action="">
          <div className="w-full lg:max-w-3xl">
            <div className="mt-8 p-4 flex flex-col lg:flex-row lg:inline-flex gap-4 rounded-md bg-indigo-50 relative z-10">
              <select title="Property Type" name="Property Type" className="py-4 w-full form-select text-blue-950 border-blue-900 rounded-md lg:w-56">
                <option value="">Property Type</option>
              </select>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LocationMarkIcon />
                </div>
                <input placeholder="Search of location" className="py-4 w-full h-full border-gray-300 rounded-md pl-10" type="text" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-5">
                  <SearchIcon />
                </div>
                <button className="py-4 w-full lg:w-auto px-11 pl-13 bg-blue-900 text-white rounded-md font-bold">Search</button>
              </div>
            </div>
          </div>
        </form>
    )
}