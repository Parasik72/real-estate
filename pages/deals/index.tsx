import ListOfDeals from "@/common/components/deals/list-of-deals.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { DealModel, DealStatuses } from "@/common/services/deal/deal.model";
import { DealEffectActions } from "@/common/services/deal/deal.service";
import { RootState } from "@/common/store/root.reducer";
import { Entity } from "@/common/store/types/store.types";
import { AuthUser } from "@/common/types/auth.types";
import { IPagination } from "@/common/types/common.types";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import apiContainer from "@/server/container";
import container from "@/common/container/container";
import { ReduxStore } from "@/common/store/redux.store";
import { ContainerKeys } from "@/common/container/container.keys";
import { ApiContainerKeys } from "@/server/contaier.keys";
import { useMemo } from "react";

interface IState {
  deals: Entity<DealModel>;
  authUser: AuthUser;
  requestedByMePage?: IPagination;
  requestedForMePage?: IPagination;
  mySuccessfulPage?: IPagination;
}

function mapStateToProps(state: RootState): IState {
  return {
    authUser: state.authUser,
    deals: state.entities.deals || {},
    requestedByMePage: state.paginations.requestedByMeDeals,
    requestedForMePage: state.paginations.requestedForMeDeals,
    mySuccessfulPage: state.paginations.mySuccessfulDeals,
  };
}

interface IDispatch {
  getRequestedByMeDeals: (payload: number) => {
      type: DealEffectActions.GET_REQUESTED_BY_ME_DEALS;
  };
  getRequestedForMeDeals: (payload: number) => {
    type: DealEffectActions.GET_REQUESTED_FOR_ME_DEALS;
  };
  getMySuccessfulDeals: (payload: number) => {
    type: DealEffectActions.GET_MY_SUCCESSFUL_DEALS;
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<DealEffectActions>>): IDispatch => {
  return {
      getRequestedByMeDeals: (payload: number) => 
        dispatch({ type: DealEffectActions.GET_REQUESTED_BY_ME_DEALS, payload }),
      getRequestedForMeDeals: (payload: number) => 
        dispatch({ type: DealEffectActions.GET_REQUESTED_FOR_ME_DEALS, payload }),
      getMySuccessfulDeals: (payload: number) => 
        dispatch({ type: DealEffectActions.GET_MY_SUCCESSFUL_DEALS, payload })
  }
}

export const getServerSideProps = container.resolve<ReduxStore>(ContainerKeys.ReduxStore)
  .getServerSideProps(
    apiContainer, [
        {
            routePath: '/deals',
            apiControllerName: ApiContainerKeys.DealController,
            serviceName: ContainerKeys.DealService,
            query: { requestedBy: 'Buyer' }
        },
        {
            routePath: '/deals',
            apiControllerName: ApiContainerKeys.DealController,
            serviceName: ContainerKeys.DealService,
            query: { requestedBy: 'Seller' }
        },
        {
            routePath: '/deals',
            apiControllerName: ApiContainerKeys.DealController,
            serviceName: ContainerKeys.DealService,
            query: { dealStatusName: 'Done' }
        },
    ]
  );

function Deals({ 
    getRequestedByMeDeals,
    getRequestedForMeDeals,
    getMySuccessfulDeals,
    deals, 
    authUser,
    requestedByMePage,
    requestedForMePage,
    mySuccessfulPage,
}: IState & IDispatch) {
    const dealsIds = Object.keys(deals);
    const requestedByMe = useMemo(() => dealsIds.filter((dealId) => {
        return deals[dealId].buyerUserId === authUser.userId 
            && deals[dealId].dealStatus === DealStatuses.Awaiting;
    }), [requestedByMePage, deals, authUser.userId]);
    const requestedForMe = useMemo(() => dealsIds.filter((dealId) => {
        return deals[dealId].sellerUserId === authUser.userId 
            && deals[dealId].dealStatus === DealStatuses.Awaiting;
    }), [requestedForMePage, deals, authUser.userId]);
    const mySuccessful = useMemo(() => dealsIds.filter((dealId) => {
        return (
            deals[dealId].sellerUserId === authUser.userId
            ||  deals[dealId].buyerUserId === authUser.userId
        ) && deals[dealId].dealStatus === DealStatuses.Done;
    }), [mySuccessfulPage, deals, authUser.userId]);
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
                            dealsEntity={deals}
                            dealsIds={requestedByMe}
                            pagination={requestedByMePage}
                            onShowNext={(nextPage) => getRequestedByMeDeals(nextPage)}
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
                        dealsEntity={deals}
                        dealsIds={requestedForMe}
                        pagination={requestedForMePage}
                        onShowNext={(nextPage) => getRequestedForMeDeals(nextPage)}
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
                            dealsEntity={deals}
                            dealsIds={mySuccessful}
                            pagination={mySuccessfulPage}
                            onShowNext={(nextPage) => getMySuccessfulDeals(nextPage)}
                        />
                    </div>
                </PageContainer>
            </div>
        </PageWrapper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Deals);