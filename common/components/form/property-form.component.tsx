import { PropertyTypeForm } from "@/common/types/property.type";
import { FC } from "react"
import { Input } from "./input.component";
import { Select } from "./select.component";
import { Textarea } from "./textarea.component";
import { Divider } from "../divider.component";

interface IProps {
    type: PropertyTypeForm;
}

export const PropertyForm: FC<IProps> = ({ type }) => {
    return (
        <form action="">
            <div className="p-4 flex flex-col gap-4">
                <div className="h-full">
                    <label htmlFor="propertyType" className="pl-1 text-lg">
                        Property type
                    </label>
                    <Select id="propertyType" className="w-full">
                        <option>Property type</option>
                    </Select>
                </div>
                <div className="h-full">
                    <label htmlFor="title" className="pl-1 text-lg">
                        Title
                    </label>
                    <Input id="title" disableQuery name="title" placeholder="Title" type="text" />
                </div>
                <div className="h-full">
                    <label htmlFor="description" className="pl-1 text-lg">
                        Description
                    </label>
                    <Textarea id="description" name="description" placeholder="Description" />
                </div>
                <div className="h-full">
                    <label htmlFor="price" className="pl-1 text-lg">
                        Price $
                    </label>
                    <Input id="price" disableQuery name="price" placeholder="Price" type="number" />
                </div>
                <div className="h-full">
                    <label htmlFor="numberOfBeds" className="pl-1 text-lg">
                        Number of bedrooms
                    </label>
                    <Input id="numberOfBeds" disableQuery name="numberOfBeds" placeholder="Number of bedrooms" type="number" />
                </div>
                <div className="h-full">
                    <label htmlFor="numberOfBaths" className="pl-1 text-lg">
                        Number of bathrooms
                    </label>
                    <Input id="numberOfBaths" disableQuery name="numberOfBaths" placeholder="Number of bathrooms" type="number" />
                </div>
                <Divider text="Location" />
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="h-full">
                        <label htmlFor="country" className="pl-1 text-lg">
                            Country
                        </label>
                        <Input id="country" disableQuery name="country" placeholder="Country" type="text" />
                    </div>
                    <div className="h-full">
                        <label htmlFor="city" className="pl-1 text-lg">
                            City
                        </label>
                        <Input id="city" disableQuery name="city" placeholder="City" type="text" />
                    </div>
                </div>
                <div className="h-full">
                    <label htmlFor="addressLine1" className="pl-1 text-lg">
                        Address line 1
                    </label>
                    <Input id="addressLine1" disableQuery name="addressLine1" placeholder="Address line 1" type="text" />
                </div>
                <div className="h-full">
                    <label htmlFor="addressLine2" className="pl-1 text-lg">
                        Address line 2
                        <span className="font-bold">*</span>
                    </label>
                    <Input id="addressLine2" disableQuery name="addressLine2" placeholder="Address line 2" type="text" />
                </div>
                <Divider text="Images" />
                <div className="h-full">
                    <button className="w-full py-3 px-4 text-blue-900 border-2 border-blue-900 rounded-md font-bold">
                        Load images
                    </button>
                </div>
                <Divider />
                {type === PropertyTypeForm.EDIT && (
                    <>
                        <button className="py-4 w-full bg-red-900 text-white rounded-md font-bold">Remove the property</button>
                        <Divider />
                    </>
                )}
                <button className="py-4 w-full bg-blue-900 text-white rounded-md font-bold">Submit</button>
            </div>
        </form>
    )
}