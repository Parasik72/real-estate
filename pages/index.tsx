import Image from "next/image";
import ModernLivingImg from '../common/images/header picture.jpg';
import { SearchIcon } from "@/common/icons/search.icon";
import { LocationMarkIcon } from "@/common/icons/location-mark.icon";

export default function Home() {
  return (
    <div className="relative">
      <div className="lg:max-w-lg">
        <h1 className="text-dark-blue font-bold text-3xl lg:text-6.5xl lg:mt-20">Modern living for everyone</h1>
        <div className="flex justify-center lg:block lg:absolute lg:inset-y-0 lg:-right-14 lg:-top-20">
          <Image src={ModernLivingImg} width={580} height={557} alt="modern house" />
        </div>
        <p className="mt-4 lg:mt-0 text-dark-blue text-xl leading-8 font-light z-10 relative">We provide a complete service for the sale, purchase or rental of real estate. We have been operating in Madrid and Barcelona more than 15 years.</p>
      </div>
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
    </div>
  )
}
