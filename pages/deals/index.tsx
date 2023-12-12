import ListOfDeals from "@/common/components/deals/list-of-deals.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { DealModel } from "@/common/services/deal/deal.model";
import { RootState } from "@/common/store/root.reducer";
import { DealEffectActions } from "@/common/store/saga-effects/deal.saga-effects";
import { StoreEntity } from "@/common/store/types/store.types";
import { AuthUser } from "@/common/store/user/user.state.interface";
import { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IState {
  dealsStore: StoreEntity<DealModel>;
  authUser: AuthUser;
}

function mapStateToProps(state: RootState): IState {
  return {
    authUser: state.userReducer.authUser,
    dealsStore: state.dealReducer.entities.deals
  };
}

interface IDispatch {
  getRequestedByMeDeals: () => {
      type: DealEffectActions.GET_REQUESTED_BY_ME_DEALS;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action<DealEffectActions>>): IDispatch => {
  return {
      getRequestedByMeDeals: () => dispatch({ type: DealEffectActions.GET_REQUESTED_BY_ME_DEALS }),
  }
}

function Deals({ 
    getRequestedByMeDeals, 
    dealsStore, 
    authUser, 
}: IState & IDispatch) {
    const requestedByMe = useMemo(() => dealsStore.allIds.filter((dealId) => {
        return dealsStore.byId[dealId].buyerUserId === authUser.userId 
            && !dealsStore.byId[dealId].signDate;
    }), [dealsStore.allIds, dealsStore.byId, authUser.userId]);
    useEffect(() => {
        getRequestedByMeDeals();
    }, []);
    return (
        <PageWrapper>
            <PageContainer className="py-8">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                        My deals
                    </h2>
                </div>
            </PageContainer>
            <div className="py-8 bg-indigo-50 w-full">
                <PageContainer>
                    <div className="flex justify-between">
                        <h2 className="text-dark-blue text-3xl lg:text-4xl font-bold">
                            Requested deals by you
                        </h2>
                    </div>
                    <div className="mt-4">
                        <ListOfDeals 
                            displayCancelBtn
                            dealsEntity={dealsStore.byId}
                            dealsIds={requestedByMe}
                        />
                    </div>
                </PageContainer>
            </div>
            {/* <PageContainer className="py-8">
                <div className="flex justify-between">
                    <h2 className="text-dark-blue text-3xl lg:text-4xl font-bold">
                        Requested deals for you
                    </h2>
                </div>
                <div className="mt-4">
                    <ListOfDeals displaySignBtn displayCancelBtn />
                </div>
            </PageContainer>
            <div className="py-8 bg-indigo-50 w-full">
                <PageContainer>
                    <div className="flex justify-between">
                        <h2 className="text-dark-blue text-3xl lg:text-4xl font-bold">
                            Successful deals
                        </h2>
                    </div>
                    <div className="mt-4">
                        <ListOfDeals />
                    </div>
                </PageContainer>
            </div> */}
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Deals);