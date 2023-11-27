import Image from "next/image";
import ModernLivingImg from '../common/images/header picture.jpg';
import CardImg1 from '../common/images/card-img-1.png';
import { FormSearch } from "@/common/components/home/form-search.component";
import { ArrowIcon } from "@/common/icons/arrow.icon";

export default function Home() {
  return (
    <div className="antialiased py-8 w-full overflow-x-hidden">
      <div className="relative px-4 py-12 md:max-w-3xl md:mx-auto xl:px-0 lg:max-w-full xl:max-w-6xl">
        <div className="lg:max-w-lg">
          <h1 className="text-dark-blue font-bold text-4xl lg:text-6.5xl lg:mt-4">Modern living for everyone</h1>
          <div className="flex justify-center lg:block lg:absolute lg:inset-y-0 lg:right-0 xl:-right-14">
            <Image src={ModernLivingImg} width={580} height={557} alt="modern house" />
          </div>
          <p className="mt-4 text-dark-blue text-xl leading-8 font-light z-10 relative">We provide a complete service for the sale, purchase or rental of real estate. We have been operating in Madrid and Barcelona more than 15 years.</p>
        </div>
        <FormSearch />
      </div>
      <div className="bg-indigo-50 mt-36 w-full py-28">
        <div className="relative px-4 md:max-w-3xl md:mx-auto xl:px-0 lg:max-w-full xl:max-w-6xl">
          <h2 className="text-dark-blue text-4xl lg:text-5xl font-bold">Last offers</h2>
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
            <p className="mt-4 text-dark-blue text-xl leading-8 font-light max-w-xl">
              Fulfill your career dreams, enjoy all the achievements of the city center and luxury housing to the fullest.
            </p>
            <div className="flex items-end">
              <button className="py-3 px-4 text-blue-900 border-2 border-blue-900 rounded-md font-bold">
                Show all offers
              </button>
            </div>
          </div>
          <div className="mt-16 sm:mt-4 flex gap-5 justify-center items-center">
            <div className="hidden sm:block w-full h-2px bg-indigo-100">
              <div className="h-2px bg-blue-900 w-64"></div>
            </div>
            <div className="flex gap-5">
              <button className="bg-indigo-100 rounded-full px-6 py-5">
                <ArrowIcon reverse />
              </button>
              <button className="bg-blue-900 rounded-full px-6 py-5">
                <ArrowIcon />
              </button>
            </div>
          </div>
          <div className="inline-flex gap-5 mt-6 overflow-x-hidden">
            {[...new Array(6)].map((_, i) => (
              <div key={i} className="bg-white shadow-sm rounded-md max-w-250px md:max-w-350px w-full flex-shrink-0">
                <Image className="object-cover object-center rounded-md" src={CardImg1} alt="cardImg1" height={249} width={444} />
                <div className="p-4 flex flex-col gap-4">
                  <h3 className="text-dark-blue text-1.5xl leading-8 font-bold">
                    Large 4-room apartment with a beautiful terrace
                  </h3>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-blue-900">320 000$</span>
                    <span className="text-dark-blue">Barcelona IX. </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
