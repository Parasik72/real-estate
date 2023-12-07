import { ListOfProperties } from "@/common/components/list-of-properties.component";
import { FormSearch } from "@/common/components/offers/form-search.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { propertyService } from "@/common/services/property/property.service";
import { SetOffersAction } from "@/common/store/property/property.action.interface";
import { setOffersAction } from "@/common/store/property/property.actions";
import { RootState } from "@/common/store/root.reducer";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface IState {
    offers: (PropertyModel & {PropertyAddress: PropertyAddressModel})[];
}

function mapStateToProps(state: RootState): IState {
    return { offers: state.propertyReducer.offers }
}

interface IDispatch {
    setOffers: (payload: (PropertyModel & {
        PropertyAddress: PropertyAddressModel;
    })[]) => SetOffersAction;
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatch => {
    return {
        setOffers: (
            payload: (PropertyModel & { PropertyAddress: PropertyAddressModel; })[]
        ) => dispatch(setOffersAction(payload))
    }
}

function Offers({ offers, setOffers }: IState & IDispatch) {
    useEffect(() => {
        async function getOffers() {
            const data = await propertyService.getAllOffers();
            if (data) setOffers(data);
        }
        getOffers();
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
                <ListOfProperties properties={offers} />
            </PageContainer>
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);