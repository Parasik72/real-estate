import { FRONT_IMGS_PATH, FRONT_PATHS } from "@/common/constants/front-paths.constants";
import { DealModel } from "@/common/services/deal/deal.model";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";
import { StoreEntity } from "@/common/store/types/store.types";
import { AuthUser } from "@/common/store/user/user.state.interface";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import CardImg from '@/common/images/card-img-1.png';
import { RootState } from "@/common/store/root.reducer";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { DealEffectActions } from "@/common/store/saga-effects/deal.saga-effects";
import { useRouter } from "next/router";

interface IState {
  propertyImagesStore: StoreEntity<PropertyImageModel>;
  usersStore: StoreEntity<UserModel>;
  authUser: AuthUser;
}

interface IProps {
    deal: DealModel;
    property: PropertyModel;
    className?: string;
    displaySignBtn?: boolean;
    displayCancelBtn?: boolean;
    isSuccessful?: boolean;
}

function mapStateToProps(state: RootState, ownProps: IProps): IState {
  return {
    authUser: state.userReducer.authUser,
    propertyImagesStore: state.propertyReducer.entities.propertyImages,
    usersStore: state.userReducer.entities.users,
    ...ownProps
  };
}

interface IDispatch {
  signDeal: (dealId: string, callback: () => void) => {
      type: DealEffectActions.SIGN_DEAL;
      payload: {
        dealId: string;
        callback: () => void;
      };
  };
  cancelDeal: (dealId: string, callback: () => void) => {
    type: DealEffectActions.CANCEL_DEAL;
    payload: {
        dealId: string;
        callback: () => void;
    };
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<DealEffectActions>>): IDispatch => {
  return {
    signDeal: (
        dealId: string, 
        callback: () => void
    ) => dispatch({ type: DealEffectActions.SIGN_DEAL, payload: { dealId, callback } }),
    cancelDeal: (
        dealId: string, 
        callback: () => void
    ) => dispatch({ type: DealEffectActions.CANCEL_DEAL, payload: { dealId, callback } }),
  }
}

function DealCard({
    usersStore,
    propertyImagesStore,
    authUser,
    deal,
    property,
    className,
    displaySignBtn,
    displayCancelBtn,
    isSuccessful,
    signDeal,
    cancelDeal
}: IState & IProps & IDispatch) {
    if (!property) return <div>Loading...</div>
    const router = useRouter();
    const imgId = useMemo(() => propertyImagesStore.allIds.find((item) => {
      return propertyImagesStore.byId[item].propertyId === property.propertyId;
    }), [propertyImagesStore.allIds, property.propertyId]);
    const imgPath = useMemo(() => imgId 
      ? FRONT_IMGS_PATH.property.replace(':imgName', propertyImagesStore.byId[imgId].imgName)
      : CardImg, [CardImg, FRONT_IMGS_PATH, imgId, propertyImagesStore.byId]);
    const onSignDeal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!deal?.dealId) return;
        e.preventDefault();
        e.stopPropagation();
        signDeal(
            deal.dealId, 
            () => router.push(FRONT_PATHS.offerById.replace(':propertyId', deal.propertyId))
        );
    }
    const onCancelDeal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!deal?.dealId) return;
        e.preventDefault();
        e.stopPropagation();
        cancelDeal(
            deal.dealId, 
            () => router.push(FRONT_PATHS.offerById.replace(':propertyId', deal.propertyId))
        );
    }
    return (
        <Link 
            href={FRONT_PATHS.offerById.replace(':propertyId', deal.propertyId)} 
            className={clsx(
                "block h-full shadow-lg rounded-md w-full flex-shrink-0",
                {
                    'bg-white': !isSuccessful,
                    'bg-green-100': isSuccessful
                },
                className
            )}
        >
            <Image 
                className="bg-indigo-50 h-64 max-h-64 w-full object-cover object-center rounded-md" 
                src={imgPath} 
                alt={property.title} 
                height={249} 
                width={444} 
            />
            <div className="p-4 flex flex-col gap-4">
                <h3 className="text-dark-blue text-1.5xl leading-8 font-bold">
                {property.title}
                </h3>
                <div className="flex flex-col gap-1">
                <span className="font-bold text-blue-900">{deal.totalPrice}$</span>
                <span className="text-dark-blue">
                    {`${property.PropertyAddress?.countryName}, ${property.PropertyAddress?.cityName}`}
                </span>
                </div>
                <h4 className="text-dark-blue">
                    <span className="font-bold">Seller: </span>
                    <span>{usersStore.byId[deal.sellerUserId].email}</span>
                    {deal.sellerUserId === authUser.userId && <span className="font-bold">(YOU)</span>}
                </h4>
                <h4 className="text-dark-blue">
                    <span className="font-bold">Buyer: </span>
                    <span>{usersStore.byId[deal.buyerUserId].email}</span>
                    {deal.buyerUserId === authUser.userId && <span className="font-bold">(YOU)</span>}
                </h4>
                {displaySignBtn && (
                    <button onClick={onSignDeal} className="px-6 py-2 text-white bg-blue-900 rounded-md font-bold">
                        Sign the deal
                    </button>
                )}
                {displayCancelBtn && (
                    <button onClick={onCancelDeal} className="px-6 py-2 text-white bg-red-900 rounded-md font-bold">
                        Cancel the deal
                    </button>
                )}
            </div>
        </Link>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DealCard);