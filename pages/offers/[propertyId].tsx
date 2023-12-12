import { CompanyIcon } from '@/common/icons/company.icon';
import { DimensionIcon } from '@/common/icons/dimension.icon';
import { LocationMarkSpotIcon } from '@/common/icons/location-mark-spot.icon';
import { UserInfo } from '@/common/components/profile/user-info.component';
import { PageWrapper } from '@/common/components/page-wrapper.component';
import { PageContainer } from '@/common/components/page-container.component';
import Link from 'next/link';
import { PropertyModel } from '@/common/services/property/property.model';
import { UserModel } from '@/common/services/user/user.model';
import { getPropertyTypeNameWithArticle } from '@/common/functions/property.functions';
import { RootState } from '@/common/store/root.reducer';
import { Action, Dispatch } from 'redux';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { PropertyEffectActions } from '@/common/store/saga-effects/property.saga-effects';
import { Entity, StoreEntity } from '@/common/store/types/store.types';
import { AuthUser } from '@/common/store/user/user.state.interface';
import { FRONT_PATHS } from '@/common/constants/front-paths.constants';
import { PropertyImageModel } from '@/common/services/property/property-image.model';
import { PropertyImages } from '@/common/components/property/property-images.component';

interface IState {
    properties: Entity<PropertyModel>;
    propertyImagesStore: StoreEntity<PropertyImageModel>;
    users: Entity<UserModel>;
    authUser: AuthUser;
}
  
function mapStateToProps(state: RootState): IState {
  return { 
    properties: state.propertyReducer.entities.properties.byId || {},
    propertyImagesStore: state.propertyReducer.entities.propertyImages,
    users: state.userReducer.entities.users.byId || {},
    authUser: state.userReducer.authUser
  }
}

interface IDispatch {
    getProperty: (propertyId: string) => {
        type: PropertyEffectActions.GET_PROPERTY;
        payload: {
            propertyId: string;
        };
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<PropertyEffectActions>>): IDispatch => {
  return {
    getProperty: (propertyId: string) => 
        dispatch({ type: PropertyEffectActions.GET_PROPERTY, payload: { propertyId } })
  }
}

function Property({ 
    properties,
    propertyImagesStore,
    users, 
    authUser, 
    getProperty 
}: IState & IDispatch) {
    const router = useRouter();
    const propertyId = router.query.propertyId as string || '';
    useEffect(() => {
        if (!propertyId) return;
        getProperty(propertyId);
    }, [propertyId]);
    const property = properties[propertyId];
    if (!property || !users[property.userId]) return <div>Loading...</div>;
    const isCurrentUserOwner = authUser.isAuth && property.userId === authUser.userId;

    return (
        <PageWrapper>
            <PageContainer className="py-8">
                <h1 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                    { property.title }
                </h1>
                <div className="flex flex-col lg:flex-row gap-10 mt-10">
                    <div className="w-full">
                        <div>
                            <PropertyImages propertyImagesStore={propertyImagesStore} />
                            <div className="flex flex-col gap-5 md:px-20 mt-5">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex items-center gap-5">
                                        <CompanyIcon />
                                        <span className="text-dark-blue font-bold text-xl">
                                            {getPropertyTypeNameWithArticle(property.propertyType)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <DimensionIcon />
                                        <span className="text-dark-blue font-bold text-xl flex">
                                            { property.area }m
                                            <div className="h-full flex">
                                                <span className="text-sm">2</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <LocationMarkSpotIcon />
                                        <span className="text-dark-blue font-bold text-xl">
                                            {`${property.PropertyAddress?.countryName}, ${property.PropertyAddress?.cityName}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 md:px-20 py-4">
                                <div className="p-4 bg-indigo-50 flex justify-between items-center rounded-md">
                                    <div>
                                        <span className="text-dark-blue">Price:</span>
                                        <h3 className="text-dark-blue font-bold text-xl">
                                            { property.priceAmount } $
                                        </h3>
                                    </div>
                                    {authUser.isAuth && !isCurrentUserOwner && (
                                        <button className="px-6 py-3 text-white bg-blue-900 rounded-md font-bold">
                                            Send the deal
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="mt-8 md:px-20">
                                <p className="text-dark-blue">
                                    { property.description }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 lg:max-w-350px w-full">
                        <div className="flex flex-col md:flex-row justify-center lg:justify-normal lg:flex-col w-full gap-10">
                            <UserInfo user={users[property.userId]} displayBrokerLink className="bg-indigo-50" />
                            <div className="p-4 bg-indigo-50 rounded-sm flex flex-col gap-5">
                                <h3 className="text-dark-blue text-xl font-bold">
                                    Brief characteristics
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    <li className="text-dark-blue">
                                        <span className="font-bold">Country:</span>
                                        &nbsp;{property.PropertyAddress?.countryName}
                                    </li>
                                    <li className="text-dark-blue">
                                        <span className="font-bold">City:</span>
                                        &nbsp;{property.PropertyAddress?.cityName}
                                    </li>
                                    <li className="text-dark-blue">
                                        <span className="font-bold">Type:</span>
                                        &nbsp;{property.propertyType}
                                    </li>
                                    <li className="text-dark-blue">
                                        <span className="font-bold">Total area:</span>
                                        &nbsp;{ property.area } m2
                                    </li>
                                    <li className="text-dark-blue">
                                        <span className="font-bold">Number of bedrooms:</span>
                                        &nbsp;{ property.bedRooms }
                                    </li>
                                    <li className="text-dark-blue">
                                        <span className="font-bold">Number of bathrooms:</span>
                                        &nbsp;{ property.bathRooms }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {isCurrentUserOwner && (
                            <div className="md:px-20 lg:px-0">
                                <Link 
                                    href={FRONT_PATHS.editOfferById.replace(':propertyId', propertyId)} 
                                    className="text-center block py-4 w-full bg-blue-900 text-white rounded-md font-bold"
                                >
                                    Edit the property
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Property);