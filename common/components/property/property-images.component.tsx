import { ArrowIcon } from "@/common/icons/arrow.icon"
import Image from 'next/image';
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { FC, useMemo, useState } from "react";
import { FRONT_IMGS_PATH } from "@/common/constants/front-paths.constants";
import { StoreEntity } from "@/common/store/types/store.types";
import clsx from "clsx";

interface IProps {
    propertyImagesStore: StoreEntity<PropertyImageModel>;
}

export const PropertyImages: FC<IProps> = ({ propertyImagesStore }) => {
    const [selectedImg, setSelectedImg] = useState(propertyImagesStore.allIds[0]);
    const [imgOffset, setImgOffset] = useState(0);
    const leftArrowDisabled = imgOffset === 0;
    const rightArrowDisabled = imgOffset + 3 >= propertyImagesStore.allIds.length;
    const leftArrowMobileDisabled = propertyImagesStore.allIds[0] === selectedImg;
    const rightArrowMobileDisabled = 
        propertyImagesStore.allIds[propertyImagesStore.allIds.length - 1] === selectedImg;
    const carouselImgs = useMemo(
        () => [...propertyImagesStore.allIds].splice(imgOffset, 3), 
        [propertyImagesStore.allIds, imgOffset]
    );

    const leftArrowClick = () => setImgOffset(prev => prev - 1);
    const rightArrowClick = () => setImgOffset(prev => prev + 1);
    const leftArrowMobileClick = () => {
        const index = propertyImagesStore.allIds.findIndex((item) => item === selectedImg) - 1;
        setSelectedImg(propertyImagesStore.allIds[index]);
    };
        
    const rightArrowMobileClick = () => {
        const index = propertyImagesStore.allIds.findIndex((item) => item === selectedImg) + 1;
        setSelectedImg(propertyImagesStore.allIds[index]);
    }; 

    if (propertyImagesStore.allIds.length === 0) return <div>No images</div>

    const primaryImg = propertyImagesStore.byId[selectedImg].imgName;

    return (
        <>
            <div className="md:block bg-indigo-50 max-h-96">
                <Image 
                    className="w-full h-full object-cover object-center shadow-sm max-h-96" 
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
                            className={clsx("block w-full xl:max-h-24 box-border", {
                                'border-4': carouselImg === selectedImg,
                                'border-blue-500': carouselImg === selectedImg,
                            })}
                            onClick={() => setSelectedImg(carouselImg)}
                        >
                            <Image 
                                className="h-full w-full object-cover object-center shadow-sm" 
                                src={
                                    FRONT_IMGS_PATH
                                    .property
                                    .replace(':imgName', propertyImagesStore.byId[carouselImg].imgName)
                                } 
                                width={191} 
                                height={84} 
                                alt='carouselImg' 
                            />
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