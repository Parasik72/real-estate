import { 
    PropertyActionsForm, 
    PropertyStatuses, 
    PropertyTypeForm, 
    PropertyTypes, 
    PropertyVariableTypes 
} from "@/common/types/property.type";
import { Divider } from "../divider.component";
import { Form, Formik } from "formik";
import { FormikInput } from "./formik-input.component";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import Image from 'next/image';
import { FRONT_IMGS_PATH } from "@/common/constants/front-paths.constants";
import { Entity } from "@/common/store/types/store.types";

interface IProps<T extends PropertyVariableTypes> {
    data: PropertyActionsForm<T>;
    newImages: FileList | null;
    setNewImages: Dispatch<SetStateAction<FileList | null>>;
    propertyImages?: Entity<PropertyImageModel>;
}

export function PropertyForm<T extends PropertyVariableTypes>({ 
    data, 
    newImages, 
    setNewImages,
    propertyImages
}: IProps<T>) {
    const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewImages(e.target.files);
    }
    return (
        <Formik initialValues={data.variables} onSubmit={data.onSubmit} validationSchema={data.validationSchema}>
            <Form className="p-4 flex flex-col gap-4">
                <FormikInput title="Property type" id="propertyType" name="propertyType" as="select">
                    {Object.values(PropertyTypes).map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </FormikInput>
                <FormikInput title="Property status" id="propertyStatus" name="propertyStatus" as="select">
                    {Object.values(PropertyStatuses).map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </FormikInput>
                <FormikInput title="Title" id="title" name="title" placeholder="Title" type="text" />
                <FormikInput title="Description" id="description" name="description" placeholder="Description" type="text" as="textarea" />
                <FormikInput title="Total area" id="area" name="area" placeholder="Total area" type="number" />
                <FormikInput title="Price $" id="priceAmount" name="priceAmount" placeholder="Price" type="number" />
                <FormikInput title="Number of bedrooms" id="bedRooms" name="bedRooms" placeholder="Number of bedrooms" type="number" />
                <FormikInput title="Number of bathrooms" id="bathRooms" name="bathRooms" placeholder="Number of bathrooms" type="number" />
                <Divider text="Location" />
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <FormikInput title="Country" id="countryName" name="countryName" placeholder="Country" type="text" />
                    <FormikInput title="City" id="cityName" name="cityName" placeholder="City" type="text" />
                </div>
                <div className="h-full">
                    <FormikInput title="Address line 1" id="addressLine1" name="addressLine1" placeholder="Address line 1" type="text" />
                </div>
                <div className="h-full">
                    <FormikInput optional title="Address line 2" id="addressLine2" name="addressLine2" placeholder="Address line 2" type="text" />
                </div>
                <Divider text="Add images" />
                <div className="h-full flex text-center">
                    <input onChange={onImagesChange} multiple id="images" className="hidden" type="file" accept="image/*" />
                    <label 
                        htmlFor="images" 
                        className={clsx("w-full py-3 px-4 border-2 rounded-md font-bold cursor-pointer", {
                            'text-blue-900': !newImages,
                            'bg-transparent': !newImages,
                            'border-blue-900': !newImages,
                            'text-white': newImages,
                            'bg-green-900': newImages,
                            'border-green-900': newImages,
                        })}
                    >
                        {newImages ? 'Images loaded' : 'Load images'}
                    </label>
                </div>
                {data.type === PropertyTypeForm.EDIT && <Divider text="Current images" />}
                <div className="flex flex-col gap-10">
                    {data.type === PropertyTypeForm.EDIT 
                    && propertyImages 
                    && Object.keys(propertyImages).map((imgId, index) => (
                        <div key={imgId} className="flex flex-col gap-3 items-center">
                            <Image
                                className="w-full"
                                src={
                                    FRONT_IMGS_PATH
                                        .property
                                        .replace(':imgName', propertyImages[imgId].imgName)
                                } 
                                alt="currentImg" 
                                width={300} 
                                height={200} 
                            />
                            <div className="flex gap-5 items-center">
                                <FormikInput
                                    className="cursor-pointer"
                                    name='imgsToDeleteIds' 
                                    id='imgsToDeleteIds' 
                                    title="Remove ?"
                                    type="checkbox"
                                    value={imgId}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <Divider />
                <button
                    type="submit"
                    className="py-4 w-full bg-blue-900 text-white rounded-md font-bold"
                >
                    Submit
                </button>
            </Form>
        </Formik>
    )
}