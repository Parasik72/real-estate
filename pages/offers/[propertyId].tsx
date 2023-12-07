import Image from 'next/image';
import PropertyPrimaryImg from '../../common/images/property-primary.png';
import PropertySecondImg from '../../common/images/property-second.png';
import { ArrowIcon } from '@/common/icons/arrow.icon';
import { CompanyIcon } from '@/common/icons/company.icon';
import { DimensionIcon } from '@/common/icons/dimension.icon';
import { LocationMarkSpotIcon } from '@/common/icons/location-mark-spot.icon';
import { UserInfo } from '@/common/components/profile/user-info.component';
import { PageWrapper } from '@/common/components/page-wrapper.component';
import { PageContainer } from '@/common/components/page-container.component';
import Link from 'next/link';
import { PropertyModel } from '@/common/services/property/property.model';
import { UserModel } from '@/common/services/user/user.model';
import { PropertyAddressModel } from '@/common/services/property/property-address.model';
import { getPropertyTypeNameWithArticle } from '@/common/functions/property.functions';
import { RootState } from '@/common/store/root.reducer';
import { setPropertyAction } from '@/common/store/property/property.actions';
import { Dispatch } from 'redux';
import { SetPropertyAction } from '@/common/store/property/property.action.interface';
import { useEffect } from 'react';
import { propertyService } from '@/common/services/property/property.service';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

interface IState {
    property?: PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel};
}
  
function mapStateToProps(state: RootState): IState {
  return { property: state.propertyReducer.property }
}

interface IDispatch {
    setProperty: (payload: PropertyModel & {
        PropertyAddress: PropertyAddressModel, User: UserModel
    }) => SetPropertyAction
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatch => {
  return {
    setProperty: (
          payload: PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel}
      ) => dispatch(setPropertyAction(payload))
  }
}

function Property({ property, setProperty }: IState & IDispatch) {
    const router = useRouter();
    useEffect(() => {
        if (!router.query.propertyId) return;
        const propertyId = router.query.propertyId as string || '';
        async function getProperty() {
            const data = await propertyService.getPropertyById(propertyId);
            if (data) setProperty(data);
        }
        getProperty();
    }, [router.query.propertyId]);
    if (!property) return <div>Loading...</div>
    return (
        <PageWrapper>
            <PageContainer className="py-8">
                <h1 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                    { property.title }
                </h1>
                <div className="flex flex-col lg:flex-row gap-10 mt-10">
                    <div className="w-full">
                        <div>
                            <div className="md:block bg-indigo-50">
                                <Image className="w-full object-cover object-center shadow-sm" src={PropertyPrimaryImg} width={735} height={363} alt='primary' />
                            </div>
                            <div className="flex py-4 items-center justify-between gap-4">
                                <button className="hidden md:block bg-indigo-100 rounded-full px-6 py-5">
                                    <ArrowIcon reverse />
                                </button>
                                <div className="hidden w-full md:flex justify-between gap-4">
                                    <div className="w-full xl:max-h-24">
                                        <Image className="h-full object-cover object-center shadow-sm" src={PropertyPrimaryImg} width={191} height={84} alt='second1' />
                                    </div>
                                    <div  className="w-full xl:max-h-24">
                                        <Image className="h-full object-cover object-center shadow-sm" src={PropertySecondImg} width={191} height={84} alt='second2' />
                                    </div>
                                    <div  className="w-full xl:max-h-24">
                                        <Image className="h-full object-cover object-center shadow-sm" src={PropertySecondImg} width={191} height={84} alt='second3' />
                                    </div>
                                </div>
                                <button className="hidden md:block bg-blue-900 rounded-full px-6 py-5">
                                    <ArrowIcon />
                                </button>
                            </div>
                            <div className="flex justify-center gap-5 md:hidden">
                                <button className="bg-indigo-100 rounded-full px-6 py-5">
                                    <ArrowIcon reverse />
                                </button>
                                <button className="bg-blue-900 rounded-full px-6 py-5">
                                    <ArrowIcon />
                                </button>
                            </div>
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
                                            {`${property.PropertyAddress.countryName}, ${property.PropertyAddress.cityName}`}
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
                                    <button className="px-6 py-3 text-white bg-blue-900 rounded-md font-bold">
                                        Send the deal
                                    </button>
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
                            <UserInfo user={property.User} displayBrokerLink className="bg-indigo-50" />
                            <div className="p-4 bg-indigo-50 rounded-sm flex flex-col gap-5">
                                <h3 className="text-dark-blue text-xl font-bold">
                                    Brief characteristics
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    <li className="text-dark-blue">
                                        <span className="font-bold">Country:</span>
                                        &nbsp;{property.PropertyAddress.countryName}
                                    </li>
                                    <li className="text-dark-blue">
                                        <span className="font-bold">City:</span>
                                        &nbsp;{property.PropertyAddress.cityName}
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
                                        <span className="font-bold">Number of beds:</span>
                                        &nbsp;{ property.bedRooms }
                                    </li>
                                    <li className="text-dark-blue">
                                        <span className="font-bold">Number of bathrooms:</span>
                                        &nbsp;{ property.bathRooms }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:px-20 lg:px-0">
                            <Link href="/offers/edit/1" className="text-center block py-4 w-full bg-blue-900 text-white rounded-md font-bold">Edit the property</Link>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Property);