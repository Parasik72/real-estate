import DealCard from './deal-card.component';
import { Entity, StoreEntity } from '@/common/store/types/store.types';
import { DealModel } from '@/common/services/deal/deal.model';
import { PropertyModel } from '@/common/services/property/property.model';
import { RootState } from '@/common/store/root.reducer';
import { connect } from 'react-redux';

interface IState {
  propertiesStore: StoreEntity<PropertyModel>;
}

interface IProps {
    dealsIds: string[];
    dealsEntity: Entity<DealModel>;
    displaySignBtn?: boolean;
    displayCancelBtn?: boolean;
}

function mapStateToProps(state: RootState, ownProps: IProps): IState {
  return {
    propertiesStore: state.propertyReducer.entities.properties,
  };
}

function ListOfDeals({
    propertiesStore,
    dealsIds,
    dealsEntity,
    displayCancelBtn,
    displaySignBtn
}: IState & IProps){
    return (
        <div className="flex flex-wrap -mx-4">
            {dealsIds.map((dealId) => (
                <div key={dealId} className="md:w-1/2 lg:w-1/3 p-4">
                    <DealCard
                        deal={dealsEntity[dealId]}
                        property={propertiesStore.byId[dealsEntity[dealId].propertyId]}
                        displaySignBtn={displaySignBtn}
                        displayCancelBtn={displayCancelBtn}
                    />
                </div>
            ))}
            <div className="w-full flex justify-center">
                <button className="mt-4 py-3 px-4 text-blue-900 border-2 border-blue-900 rounded-md font-bold">
                    Show next
                </button>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, null)(ListOfDeals);