import Image from "next/image";
import ModernLivingImg from '../common/images/header picture.jpg';
import AboutUsImg from '../common/images/about-us.png';
import { FormSearch } from "@/common/components/home/form-search.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { PageContainer } from "@/common/components/page-container.component";
import { Action, Dispatch } from "redux";
import { connect } from "react-redux";
import Link from "next/link";
import { FRONT_PATHS } from "@/common/constants/front-paths.constants";
import { UserEffectActions } from "@/common/services/user/user.service";
import { PropertyEffectActions } from "@/common/services/property/property.service";
import apiContainer from "@/server/container";
import container from "@/common/container/container";
import { ReduxStore } from "@/common/store/redux.store";
import { ContainerKeys } from "@/common/container/container.keys";
import { ApiContainerKeys } from "@/server/contaier.keys";
import { PropertyContainer } from "@/common/components/home/property-container.component";

interface IDispatch {
  getLastOffers: () => {
    type: PropertyEffectActions.GET_LAST_OFFERS;
}
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<PropertyEffectActions | UserEffectActions>>
): IDispatch => {
  return { 
    getLastOffers: () => dispatch({ type: PropertyEffectActions.GET_LAST_OFFERS }),
  }
}

export const getServerSideProps = container.resolve<ReduxStore>(ContainerKeys.ReduxStore)
  .getServerSideProps(
    apiContainer,
    [{
      routePath: '/properties/last-offers',
      apiControllerName: ApiContainerKeys.PropertyController,
      serviceName: ContainerKeys.PropertyService
    }]
  );

function Home() {
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
          <PropertyContainer />
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

export default connect(null, mapDispatchToProps)(Home);
