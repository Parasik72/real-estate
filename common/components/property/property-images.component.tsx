import { ArrowIcon } from "@/common/icons/arrow.icon"
import Image from 'next/image';
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { FC, useMemo, useState } from "react";
import { FRONT_IMGS_PATH } from "@/common/constants/front-paths.constants";
import { Entity } from "@/common/store/types/store.types";
import clsx from "clsx";

interface IProps {
    propertyImages: Entity<PropertyImageModel>;
}

export const PropertyImages: FC<IProps> = ({ propertyImages }) => {
    const propertyImagesIds = Object.keys(propertyImages);
    const [selectedImg, setSelectedImg] = useState(propertyImagesIds[0]);
    const [imgOffset, setImgOffset] = useState(0);
    const leftArrowDisabled = imgOffset === 0;
    const rightArrowDisabled = imgOffset + 3 >= propertyImagesIds.length;
    const leftArrowMobileDisabled = propertyImagesIds[0] === selectedImg;
    const rightArrowMobileDisabled = 
        propertyImagesIds[propertyImagesIds.length - 1] === selectedImg;
    const carouselImgs = useMemo(
        () => [...propertyImagesIds].splice(imgOffset, 3), 
        [propertyImagesIds, imgOffset]
    );

    const leftArrowClick = () => setImgOffset(prev => prev - 1);
    const rightArrowClick = () => setImgOffset(prev => prev + 1);
    const leftArrowMobileClick = () => {
        const index = propertyImagesIds.findIndex((item) => item === selectedImg) - 1;
        setSelectedImg(propertyImagesIds[index]);
    };
        
    const rightArrowMobileClick = () => {
        const index = propertyImagesIds.findIndex((item) => item === selectedImg) + 1;
        setSelectedImg(propertyImagesIds[index]);
    }; 

    if (propertyImagesIds.length === 0) return <div>No images</div>

    const primaryImg = propertyImages[selectedImg]?.imgName 
        || propertyImages[propertyImagesIds[0]]?.imgName
        || '';

    return (
        <>
            <div className="md:block bg-indigo-50 max-h-96">
                <Image 
                    className="w-full h-96 object-cover object-center shadow-sm max-h-96" 
                    src={FRONT_IMGS_PATH.property.replace(':imgName', primaryImg)} 
                    width={735} 
                    height={363} 
                    alt='primary'
                />
            </div>
            <div className="flex py-4 items-center justify-between gap-4">
                <button 
                    disabled={leftArrowDisabled}
                    onClick={leftArrowClick} 
                    className="hidden md:block bg-blue-900 rounded-full px-6 py-5 disabled:bg-indigo-100"
                >
                    <ArrowIcon reverse />
                </button>
                <div className="hidden w-full md:flex justify-between gap-4">
                    {carouselImgs.map((carouselImg) => (
                        <button 
                            key={carouselImg} 
                            className="block relative w-full xl:max-h-24 box-border"
                            onClick={() => setSelectedImg(carouselImg)}
                        >
                            <Image 
                                className="h-full w-full object-cover object-center shadow-sm" 
                                src={
                                    FRONT_IMGS_PATH
                                    .property
                                    .replace(':imgName', propertyImages[carouselImg].imgName)
                                } 
                                width={191} 
                                height={84} 
                                alt='carouselImg' 
                            />
                            <div className={clsx("w-full h-full border-4 border-blue-500 absolute inset-0 left-0 top-0", {
                                'hidden': propertyImages[carouselImg].imgName !== primaryImg,
                            })} />
                        </button>
                    ))}
                </div>
                <button
                    disabled={rightArrowDisabled} 
                    onClick={rightArrowClick} 
                    className="hidden md:block bg-blue-900 rounded-full px-6 py-5 disabled:bg-indigo-100"
                >
                    <ArrowIcon />
                </button>
            </div>
            <div className="flex justify-center gap-5 md:hidden">
                <button 
                    disabled={leftArrowMobileDisabled} 
                    onClick={leftArrowMobileClick} 
                    className="block bg-blue-900 rounded-full px-6 py-5 disabled:bg-indigo-100"
                >
                    <ArrowIcon reverse />
                </button>
                <button 
                    disabled={rightArrowMobileDisabled} 
                    onClick={rightArrowMobileClick} 
                    className="block bg-blue-900 rounded-full px-6 py-5 disabled:bg-indigo-100"
                >
                    <ArrowIcon />
                </button>
            </div>
        </>
    )
}