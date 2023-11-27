import { FormSearch } from "@/common/components/home/form-search.component";

export default function Offers() {
    return (
        <div className="antialiased py-8 w-full">
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
            <div className="bg-indigo-50 w-full">
                <div className="px-4 md:max-w-3xl md:mx-auto xl:px-0 lg:max-w-full xl:max-w-6xl flex justify-center">
                    <FormSearch />
                </div>
            </div>
        </div>
    )
}