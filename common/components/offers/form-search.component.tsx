import { FC } from "react";
import { Divider } from "../divider.component"
import { Input } from "../form/input.component"
import { Select } from "../form/select.component"
import { SearchIcon } from "@/common/icons/search.icon"
import { PropertyTypes } from "@/common/types/property.type";

interface IProps {
    onSearch: () => void;
}

export const FormSearch: FC<IProps> = ({ onSearch }) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <div className="w-full flex flex-col lg:w-auto md:flex-row lg:inline-flex gap-4 rounded-md bg-indigo-50 relative z-10">
                    <Select title="Property Type" name="propertyType" className="w-full text-blue-950 border-blue-900 lg:w-56">
                        {Object.values(PropertyTypes).map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </Select>
                    <div className="relative lg:max-w-xl md:w-full">
                        <Input name="keyword" placeholder="Enter a keyword" type="text" />
                    </div>
                    <button onClick={onSearch} className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-5">
                            <SearchIcon />
                        </div>
                        <span
                            className="py-4 w-full lg:w-auto px-11 pl-13 bg-blue-900 text-white rounded-md font-bold"
                        >
                            Search
                        </span>
                    </button>
                </div>
                <Divider className="py-7" text="Advanced filters" />
                <div className="w-full flex flex-col">
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-1/2 p-3 lg:w-1/4">
                            <Input type="number" placeholder="Number of beds" name="bedsNum" />
                        </div>
                        <div className="w-1/2 p-3 lg:w-1/4">
                            <Input type="number" placeholder="Number of baths" name="bathsNum" />
                        </div>
                        <div className="w-1/2 p-3 lg:w-1/4">
                            <Input type="number" placeholder="Min area" name="minArea" />
                        </div>
                        <div className="w-1/2 p-3 lg:w-1/4">
                            <Input type="number" placeholder="Max area" name="maxArea" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-1/2 p-3 lg:w-1/4">
                            <Input type="text" placeholder="Country" name="country" />
                        </div>
                        <div className="w-1/2 p-3 lg:w-1/4">
                            <Input type="text" placeholder="City" name="city" />
                        </div>
                        <div className="w-1/2 p-3 lg:w-1/4">
                            <Input type="text" placeholder="Address line 1" name="addressLine1" />
                        </div>
                        <div className="w-1/2 p-3 lg:w-1/4">
                            <Input type="text" placeholder="Address line 2" name="addressLine2" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full p-3 lg:w-1/2">
                            <Input type="number" placeholder="Min price" name="minPrice" />
                        </div>
                        <div className="w-full p-3 lg:w-1/2">
                            <Input type="number" placeholder="Max price" name="maxPrice" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}