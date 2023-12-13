import ListOfDeals from "@/common/components/deals/list-of-deals.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { DealModel, DealStatuses } from "@/common/services/deal/deal.model";
import { RootState } from "@/common/store/root.reducer";
import { DealEffectActions } from "@/common/store/saga-effects/deal.saga-effects";
import { StoreEntity } from "@/common/store/types/store.types";
import { AuthUser } from "@/common/store/user/user.state.interface";
import { IPagination } from "@/common/types/common.types";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IState {
  dealsStore: StoreEntity<DealModel>;
  authUser: AuthUser;
  requestedByMePage?: IPagination;
  requestedForMePage?: IPagination;
  mySuccessfulPage?: IPagination;
}

function mapStateToProps(state: RootState): IState {
  return {
    authUser: state.userReducer.authUser,
    dealsStore: state.dealReducer.entities.deals,
    requestedByMePage: state.dealReducer.paginations.requestedByMeDeals,
    requestedForMePage: state.dealReducer.paginations.requestedForMeDeals,
    mySuccessfulPage: state.dealReducer.paginations.mySuccessfulDeals,
  };
}

interface IDispatch {
  getRequestedByMeDeals: () => {
      type: DealEffectActions.GET_REQUESTED_BY_ME_DEALS;
  };
  getRequestedForMeDeals: () => {
    type: DealEffectActions.GET_REQUESTED_FOR_ME_DEALS;
  };
  getMySuccessfulDeals: () => {
    type: DealEffectActions.GET_MY_SUCCESSFUL_DEALS;
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<DealEffectActions>>): IDispatch => {
  return {
      getRequestedByMeDeals: () => dispatch({ type: DealEffectActions.GET_REQUESTED_BY_ME_DEALS }),
      getRequestedForMeDeals: () => dispatch({ type: DealEffectActions.GET_REQUESTED_FOR_ME_DEALS }),
      getMySuccessfulDeals: () => dispatch({ type: DealEffectActions.GET_MY_SUCCESSFUL_DEALS }),
  }
}

function Deals({ 
    getRequestedByMeDeals,
    getRequestedForMeDeals,
    getMySuccessfulDeals,
    dealsStore, 
    authUser,
    requestedByMePage,
    requestedForMePage,
    mySuccessfulPage,
}: IState & IDispatch) {
    const requestedByMe = dealsStore.allIds.filter((dealId) => {
        return dealsStore.byId[dealId].buyerUserId === authUser.userId 
            && dealsStore.byId[dealId].dealStatus === DealStatuses.Awaiting;
    });
    const requestedForMe = dealsStore.allIds.filter((dealId) => {
        return dealsStore.byId[dealId].sellerUserId === authUser.userId 
            && dealsStore.byId[dealId].dealStatus === DealStatuses.Awaiting;
    });
    const mySuccessful = dealsStore.allIds.filter((dealId) => {
        return (
            dealsStore.byId[dealId].sellerUserId === authUser.userId
            ||  dealsStore.byId[dealId].buyerUserId === authUser.userId
        ) && dealsStore.byId[dealId].dealStatus === DealStatuses.Done;
    });
    useEffect(() => {
        getRequestedByMeDeals();
        getRequestedForMeDeals();
        getMySuccessfulDeals();
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
                            pagination={requestedByMePage}
                        />
                    </div>
                </PageContainer>
            </div>
            <PageContainer className="py-8">
                <div className="flex justify-between">
                    <h2 className="text-dark-blue text-3xl lg:text-4xl font-bold">
                        Requested deals for you
                    </h2>
                </div>
                <div className="mt-4">
                    <ListOfDeals 
                        displaySignBtn 
                        displayCancelBtn
                        dealsEntity={dealsStore.byId}
                        dealsIds={requestedForMe}
                        pagination={requestedForMePage}
                    />
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
                        <ListOfDeals
                            isSuccessful
                            dealsEntity={dealsStore.byId}
                            dealsIds={mySuccessful}
                            pagination={mySuccessfulPage}
                        />
                    </div>
                </PageContainer>
            </div>
        </PageWrapper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Deals);