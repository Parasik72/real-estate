import Image from "next/image";
import ModernLivingImg from '../common/images/header picture.jpg';
import AboutUsImg from '../common/images/about-us.png';
import { FormSearch } from "@/common/components/home/form-search.component";
import { ArrowIcon } from "@/common/icons/arrow.icon";
import { PropertyCard } from "@/common/components/property-card.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PropertyModel } from "@/common/services/property/property.model";
import { RootState } from "@/common/store/root.reducer";
import { Action, Dispatch } from "redux";
import { connect } from "react-redux";
import { useEffect } from "react";
import { PropertyEffectActions } from "@/common/store/saga-effects/property.saga-effects";
import { UserEffectActions } from "@/common/store/saga-effects/user.saga-effects";
import { StoreEntity } from "@/common/store/types/store.types";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import Link from "next/link";
import { FRONT_PATHS } from "@/common/constants/front-paths.constants";

interface IState {
  properties: PropertyModel[];
  propertyImagesStore: StoreEntity<PropertyImageModel>;
}

function mapStateToProps(state: RootState): IState {
  const properties = state.propertyReducer.entities.properties.byId;
  return { 
    properties: properties ? Object.values(properties) : [],
    propertyImagesStore: state.propertyReducer.entities.propertyImages
  };
}

interface IDispatch {
  getLastOffers: () => {
    type: PropertyEffectActions;
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<PropertyEffectActions | UserEffectActions>>): IDispatch => {
  return {
    getLastOffers: () => dispatch({ type: PropertyEffectActions.GET_LAST_OFFERS }),
  }
}

interface IProps extends IState, IDispatch {
  data: {
    userId?: string;
    isAuth: boolean;
  }
}

function Home({ properties, propertyImagesStore, getLastOffers }: IProps) {
  useEffect(() => {
    getLastOffers();
  }, []);
  return (
    <PageWrapper className="overflow-x-hidden">
      <PageContainer className="relative py-12">
        <div className="lg:max-w-lg">
          <h1 className="text-dark-blue font-bold text-4xl lg:text-6.5xl lg:mt-4">
            Modern living for everyone
          </h1>
          <div className="flex justify-center lg:block lg:absolute lg:inset-y-0 lg:right-0 xl:-right-14">
            <Image src={ModernLivingImg} width={580} height={557} alt="modern house" />
          </div>
          <p className="mt-4 text-dark-blue text-xl leading-8 font-light z-10 relative">
            We provide a complete service for the sale or purchase of real estate. We have been operating in Madrid and Barcelona more than 15 years.
          </p>
        </div>
        <div className="mt-8 w-full lg:max-w-3xl">
         <FormSearch  className="p-4" />
        </div>
      </PageContainer>
      <div className="bg-indigo-50 w-full py-14 lg:mt-36 lg:py-28">
        <PageContainer className="overflow-x-hidden">
          <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
            Last offers
          </h2>
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
            <p className="mt-4 text-dark-blue text-xl leading-8 font-light max-w-xl">
              Fulfill your career dreams, enjoy all the achievements of the city center and luxury housing to the fullest.
            </p>
            <div className="flex items-end">
              <Link 
                href={FRONT_PATHS.offers}
                className="block py-3 px-4 text-blue-900 border-2 border-blue-900 rounded-md font-bold"
              >
                Show all offers
              </Link>
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
            {properties.map((property, i) => (
              <div key={property.propertyId} className="w-full flex-shrink-0 max-w-250px md:max-w-350px">
                <PropertyCard 
                  property={property}
                  propertyImagesStore={propertyImagesStore}
                  className="max-w-250px md:max-w-350px"
                />
              </div>
            ))}
          </div>
        </PageContainer>
      </div>
      <div className="py-14 lg:py-28">
        <PageContainer>
          <div className="flex flex-col-reverse gap-10 md:flex-row md:gap-20 justify-between">
              <div>
                <Image src={AboutUsImg} width={688} height={464} alt="aboutUs" />
              </div>
              <div>
                <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                  About us
                </h2>
                <div className="flex flex-col gap-4">
                  <p className="mt-4 text-dark-blue text-xl leading-8 font-light md:max-w-xl">
                    We are a company that connects the world of real estate and finance. We provide a complete service for the sale or purchase of real estate. Our advantage is more than 15 years of experience and soil in attractive locations in Slovakia with branches in Bratislava and Košice.
                  </p>
                  <p className="mt-4 text-dark-blue text-xl leading-8 font-light md:max-w-xl">
                    We have a connection to all banks on the Slovak market, so we can solve everything under one roof. By constantly innovating our business activities, we move forward and we are able to offer truly above-standard services that set us apart from the competition.
                  </p>
                </div>
              </div>
          </div>
        </PageContainer>
      </div>
    </PageWrapper>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
