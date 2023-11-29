import { PropertyCard } from "./property-card.component";
import CardImg1 from '../../common/images/card-img-1.png';

export const ListOfProperties = () => (
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
);