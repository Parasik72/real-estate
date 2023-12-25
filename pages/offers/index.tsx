import { ListOfProperties } from "@/common/components/list-of-properties.component";
import { FormSearch } from "@/common/components/offers/form-search.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { GetAllOffersParams } from "@/common/services/property/property-http.types";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { PropertyEffectActions } from "@/common/services/property/property.service";
import { RootState } from "@/common/store/root.reducer";
import { Entity } from "@/common/store/types/store.types";
import { IPagination } from "@/common/types/common.types";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import apiContainer from "@/server/container";
import container from "@/common/container/container";
import { ReduxStore } from "@/common/store/redux.store";
import { ApiContainerKeys } from "@/server/contaier.keys";
import { ContainerKeys } from "@/common/container/container.keys";
import { Paginations } from "@/common/store/paginations/paginations.enum";
import { Entities } from "@/common/store/entities/entities.enum";

interface IState {
    properties: PropertyModel[];
    propertyImages: Entity<PropertyImageModel>;
    allOffersPage: IPagination;
}

const store = container.resolve<ReduxStore>(ContainerKeys.ReduxStore);

function mapStateToProps(state: RootState): IState {
    const properties = store.getEntityPage<PropertyModel>(Paginations.AllOffersPage, Entities.Property);
    return { 
        properties: properties,
        propertyImages: state.propertyImages || {},
        allOffersPage: state.allOffersPage,
    };
}

interface IDispatch {
    getAllOffers: (payload: GetAllOffersParams) => {
        type: PropertyEffectActions.GET_ALL_OFFERS;
        payload: GetAllOffersParams;
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<PropertyEffectActions>>): IDispatch => {
    return {
        getAllOffers: (payload: GetAllOffersParams) => 
            dispatch({ type: PropertyEffectActions.GET_ALL_OFFERS, payload })
    }
}

export const getServerSideProps = store.getServerSideProps(
    apiContainer, 
    [{
      routePath: '/properties/offers',
      apiControllerName: ApiContainerKeys.PropertyController,
      serviceName: ContainerKeys.PropertyService
    }]
  );

function Offers({ 
    properties, 
    propertyImages,
    allOffersPage,
    getAllOffers 
}: IState & IDispatch) {
    const router = useRouter();
    const getFirstPage = () => {
        getAllOffers({
            page: 1,
            ...allOffersPage.query || {}
        });
    }
    return (
        <PageWrapper>
            <PageContainer className="py-8">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                        Search for an offer
                    </h2>
                    <p className="mt-4 text-dark-blue text-2xl leading-8 font-light max-w-xl">
                        Choose from the most advantageous offers
                    </p>
                </div>
            </PageContainer>
            <div className="py-8 bg-indigo-50 w-full">
                <PageContainer>
                    <FormSearch onSearch={getFirstPage} />
                </PageContainer>
            </div>
            <PageContainer className="py-8">
                <ListOfProperties 
                    properties={properties} 
                    propertyImages={propertyImages}
                    pagination={allOffersPage}
                    onShowNext={(nextPage: number) => getAllOffers({
                        page: nextPage,
                        ...router.query
                    })}
                />
            </PageContainer>
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);