import { FormSearch } from "@/common/components/offers/form-search.component";
import { PropertyCard } from "@/common/components/property-card.component";
import CardImg1 from '../../common/images/card-img-1.png';

export default function Offers() {
    return (
        <div className="antialiased pt-8 w-full">
            <div className="px-4 py-8 md:max-w-3xl md:mx-auto xl:px-0 lg:max-w-full xl:max-w-6xl">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                        Search for an offer
                    </h2>
                    <p className="mt-4 text-dark-blue text-2xl leading-8 font-light max-w-xl">
                        Choose from the most advantageous offers
                    </p>
                </div>
            </div>
            <div className="py-8 bg-indigo-50 w-full">
                <div className="px-4 md:max-w-3xl md:mx-auto xl:px-0 lg:max-w-full xl:max-w-6xl">
                    <FormSearch />
                </div>
            </div>
            <div className="px-4 py-8 md:max-w-3xl md:mx-auto xl:px-0 lg:max-w-full xl:max-w-6xl">
                <div className="flex flex-wrap justify-center -mx-4">
                    {[...new Array(12)].map((_, i) => (
                        <div key={i} className="md:w-1/2 lg:w-1/3 p-4">
                            <PropertyCard 
                                title="Large 4-room apartment with a beautiful terrace"
                                price={320000}
                                address="Barcelona IX."
                                imgPath={CardImg1}
                            />
                        </div>
                    ))}
                    <div className="w-full flex justify-center">
                        <button className="mt-4 py-3 px-4 text-blue-900 border-2 border-blue-900 rounded-md font-bold">
                            Show next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}