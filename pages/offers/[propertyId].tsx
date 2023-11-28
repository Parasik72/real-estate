import Image from 'next/image';
import PropertyPrimaryImg from '../../common/images/property-primary.png';
import PropertySecondImg from '../../common/images/property-second.png';
import { ArrowIcon } from '@/common/icons/arrow.icon';
import { CompanyIcon } from '@/common/icons/company.icon';
import { DimensionIcon } from '@/common/icons/dimension.icon';
import { LocationMarkSpotIcon } from '@/common/icons/location-mark-spot.icon';
import Link from 'next/link';

export default function Property() {
    return (
        <div className="antialiased pt-8 w-full">
            <div className="px-4 py-8 md:max-w-3xl md:mx-auto xl:px-0 lg:max-w-full xl:max-w-6xl">
                <h1 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                    Premium penthouse in central Barcelona with panoramic views
                </h1>
                <div className="flex flex-col lg:flex-row gap-10 mt-10">
                    <div className="w-full">
                        <div>
                            <div className="md:block bg-indigo-50">
                                <Image className="w-full object-cover object-center shadow-sm" src={PropertyPrimaryImg} width={735} height={363} alt='primary' />
                            </div>
                            <div className="flex py-4 items-center justify-between gap-4">
                                <button className="hidden md:block bg-indigo-100 rounded-full px-6 py-5">
                                    <ArrowIcon reverse />
                                </button>
                                <div className="hidden w-full md:flex justify-between gap-4">
                                    <Image className="w-full h-64 md:h-full object-cover object-center shadow-sm" src={PropertyPrimaryImg} width={191} height={84} alt='second1' />
                                    <Image className="w-full object-cover object-center shadow-sm" src={PropertySecondImg} width={191} height={84} alt='second2' />
                                    <Image className="w-full object-cover object-center shadow-sm" src={PropertySecondImg} width={191} height={84} alt='second3' />
                                </div>
                                <button className="hidden md:block bg-blue-900 rounded-full px-6 py-5">
                                    <ArrowIcon />
                                </button>
                            </div>
                            <div className="flex justify-center gap-5 md:hidden">
                                <button className="bg-indigo-100 rounded-full px-6 py-5">
                                    <ArrowIcon reverse />
                                </button>
                                <button className="bg-blue-900 rounded-full px-6 py-5">
                                    <ArrowIcon />
                                </button>
                            </div>
                            <div className="flex flex-col gap-5 md:px-20 mt-5">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex items-center gap-5">
                                        <CompanyIcon />
                                        <span className="text-dark-blue font-bold text-xl">
                                            an Apartment
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <DimensionIcon />
                                        <span className="text-dark-blue font-bold text-xl flex">
                                            224m
                                            <div className="h-full flex">
                                                <span className="text-sm">2</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <LocationMarkSpotIcon />
                                        <span className="text-dark-blue font-bold text-xl">
                                            Barcelona I.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 md:px-20 py-4">
                                <div className="p-4 bg-indigo-50 flex justify-between items-center rounded-md">
                                    <div>
                                        <span className="text-dark-blue">Price:</span>
                                        <h3 className="text-dark-blue font-bold text-xl">807.57 $</h3>
                                    </div>
                                    <button className="px-6 py-3 text-white bg-blue-900 rounded-md font-bold">
                                        Send the deal
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 md:px-20">
                                <p className="text-dark-blue">
                                    FEDORS GROUP offers an exclusive FOR SALE elegant large 5-room apartment on Vincent Hložník Street in the Condominium Renaissance residential complex.
                                    Thanks to its unique location, the property has access to a large Japanese garden with an area of 35 m2, which can be accessed directly from the bedroom. The front of the apartment is at the height of the third floor, so the terrace is located just above the treetops, which gives the apartment a unique atmosphere. Overall, the apartment has a direct view of the Danube River and the surrounding forests.
                                    The apartment offers extraordinary comfort, has a first-class interior from the leading architectural office Cakov Makara and equipment from renowned world furniture manufacturers. The overall atmosphere of the apartment is completed
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center lg:justify-normal lg:flex-col lg:max-w-350px w-full gap-10">
                        <div className="p-4 bg-indigo-50 rounded-sm flex flex-col justify-center items-center gap-5">
                            <div className="flex flex-col justify-center items-center">
                                <h3 className="text-dark-blue text-xl font-bold">Haylie Donin</h3>
                                <span className="block text-dark-blue">+34 555 781 731</span>
                                <span className="block text-dark-blue">haylie.donin@realestate.es</span>
                            </div>
                            <Link className="text-blue-900 underline" href="#brokerProfile">
                                View broker profile
                            </Link>
                        </div>
                        <div className="p-4 bg-indigo-50 rounded-sm flex flex-col gap-5">
                            <h3 className="text-dark-blue text-xl font-bold">
                                Brief characteristics
                            </h3>
                            <ul className="flex flex-col gap-3">
                                <li className="text-dark-blue">
                                    <span className="font-bold">Country:</span>
                                    &nbsp;Spain
                                </li>
                                <li className="text-dark-blue">
                                    <span className="font-bold">City:</span>
                                    &nbsp;Barcelona I.
                                </li>
                                <li className="text-dark-blue">
                                    <span className="font-bold">Type:</span>
                                    &nbsp;Apartment
                                </li>
                                <li className="text-dark-blue">
                                    <span className="font-bold">Total area:</span>
                                    &nbsp;307 m2
                                </li>
                                <li className="text-dark-blue">
                                    <span className="font-bold">Number of rooms:</span>
                                    &nbsp;5
                                </li>
                                <li className="text-dark-blue">
                                    <span className="font-bold">Number of bathrooms:</span>
                                    &nbsp;1
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}