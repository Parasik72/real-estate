import DealCard from './deal-card.component';
import { Entity, StoreEntity } from '@/common/store/types/store.types';
import { DealModel } from '@/common/services/deal/deal.model';
import { PropertyModel } from '@/common/services/property/property.model';
import { RootState } from '@/common/store/root.reducer';
import { connect } from 'react-redux';
import { IPagination } from '@/common/types/common.types';

interface IState {
  propertiesStore: StoreEntity<PropertyModel>;
}

interface IProps {
    dealsIds: string[];
    dealsEntity: Entity<DealModel>;
    pagination?: IPagination;
    displaySignBtn?: boolean;
    displayCancelBtn?: boolean;
    isSuccessful?: boolean;
}

function mapStateToProps(state: RootState, ownProps: IProps): IState {
  return {
    propertiesStore: state.propertyReducer.entities.properties,
    ...ownProps
  };
}

function ListOfDeals({
    propertiesStore,
    dealsIds,
    dealsEntity,
    displayCancelBtn,
    displaySignBtn,
    isSuccessful,
    pagination
}: IState & IProps){
    if (!dealsIds) return <div>Loading...</div>
    if (dealsIds.length === 0) return <div>Empty</div>
    return (
        <div className="flex flex-wrap -mx-4">
            {dealsIds.map((dealId) => (
                <div key={dealId} className="md:w-1/2 lg:w-1/3 p-4">
                    <DealCard
                        deal={dealsEntity[dealId]}
                        property={propertiesStore.byId[dealsEntity[dealId].propertyId]}
                        displaySignBtn={displaySignBtn}
                        displayCancelBtn={displayCancelBtn}
                        isSuccessful={isSuccessful}
                    />
                </div>
            ))}
            {pagination && pagination.page < pagination.totalPages && (
                <div className="w-full flex justify-center">
                    <button className="mt-4 py-3 px-4 text-blue-900 border-2 border-blue-900 rounded-md font-bold">
                        Show next
                    </button>
                </div>
            )}
        </div>
    );
};

export default connect(mapStateToProps, null)(ListOfDeals);