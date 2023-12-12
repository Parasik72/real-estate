import { ListOfProperties } from "@/common/components/list-of-properties.component";
import { FormSearch } from "@/common/components/offers/form-search.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { PropertyModel } from "@/common/services/property/property.model";
import { RootState } from "@/common/store/root.reducer";
import { PropertyEffectActions } from "@/common/store/saga-effects/property.saga-effects";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IState {
    properties: PropertyModel[];
}

function mapStateToProps(state: RootState): IState {
    return { properties: Object.values(state.propertyReducer.entities.properties.byId) };
}

interface IDispatch {
    getAllOffers: () => {
        type: PropertyEffectActions.GET_ALL_OFFERS;
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<PropertyEffectActions>>): IDispatch => {
    return {
        getAllOffers: () => dispatch({ type: PropertyEffectActions.GET_ALL_OFFERS })
    }
}

function Offers({ properties, getAllOffers }: IState & IDispatch) {
    useEffect(() => {
        getAllOffers();
    }, []);
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
                    <FormSearch />
                </PageContainer>
            </div>
            <PageContainer className="py-8">
                <ListOfProperties properties={properties} />
            </PageContainer>
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);