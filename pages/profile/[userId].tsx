import { ListOfProperties } from "@/common/components/list-of-properties.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { UserInfo } from "@/common/components/profile/user-info.component";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";
import { UserEffectActions } from "@/common/services/user/user.service";
import { RootState } from "@/common/store/root.reducer";
import { Entity } from "@/common/store/types/store.types";
import { AuthUser } from "@/common/types/auth.types";
import { IPagination } from "@/common/types/common.types";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { PropertyEffectActions } from "@/common/services/property/property.service";
import apiContainer from "@/server/container";
import container from "@/common/container/container";
import { ReduxStore } from "@/common/store/redux.store";
import { ApiContainerKeys } from "@/server/contaier.keys";
import { ContainerKeys } from "@/common/container/container.keys";

interface IState {
    users: Entity<UserModel>;
    properties: PropertyModel[];
    propertyImages: Entity<PropertyImageModel>;
    authUser: AuthUser;
    userPropertiesPage?: IPagination;
}
  
function mapStateToProps(state: RootState): IState {
  const properties = state.properties;
  return { 
    users: state.users || {},
    properties: properties ? Object.values(properties) : [],
    authUser: state.authUser,
    propertyImages: state.propertyImages || {},
    userPropertiesPage: state.userPropertiesPage
  };
}

interface IDispatch {
    getProfile: (userId: string) => {
        type: UserEffectActions;
        payload: string;
    };
    getUserProperties: (userId: string, page?: number, limit?: number) => {
        type: PropertyEffectActions.GET_USER_PROPERTIES;
        payload: {
            userId: string;
            page: number | undefined;
            limit: number | undefined;
        };
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<UserEffectActions | PropertyEffectActions>>): IDispatch => {
  return {
    getProfile: (userId: string) => 
        dispatch({ type: UserEffectActions.GET_USER_PROFILE, payload: userId }),
    getUserProperties: (userId: string, page?: number, limit?: number) =>
        dispatch({ type: PropertyEffectActions.GET_USER_PROPERTIES, payload: { userId, page, limit } }),
  }
}

export const getServerSideProps = container.resolve<ReduxStore>(ContainerKeys.ReduxStore)
  .getServerSideProps(
    apiContainer, [
        {
            routePath: '/user/profile',
            apiControllerName: ApiContainerKeys.PropertyController,
            serviceName: ContainerKeys.PropertyService
        },
        {
            routePath: '/user/profile',
            apiControllerName: ApiContainerKeys.UserController,
            serviceName: ContainerKeys.UserService
        },
    ]
  );

function Profile({ 
    users, 
    properties, 
    authUser, 
    propertyImages,
    userPropertiesPage,
    getUserProperties
}: IState & IDispatch) {
    const router = useRouter();
    const userId = router.query.userId as string || '';
    const isCurrentUserProfile = authUser.isAuth && userId === authUser.userId;
    return (
        <PageWrapper>
            <PageContainer className="py-8">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                        User profile
                    </h2>
                    {users[userId] && <div className="mt-4">
                        <UserInfo 
                            user={users[userId]} 
                            displayEditLink={isCurrentUserProfile} 
                        />
                    </div>}
                </div>
            </PageContainer>
            <div className="py-8 bg-indigo-50 w-full">
                <PageContainer>
                    <div className="flex justify-between">
                        <h2 className="text-dark-blue text-3xl lg:text-4xl font-bold">
                            User&apos;s properties
                        </h2>
                        {isCurrentUserProfile && (
                            <div className="flex gap-4">
                                <Link href="/offers/add" className="px-6 py-3 text-white bg-blue-900 rounded-md font-bold">
                                    Add a property
                                </Link>
                                <Link href="/deals" className="px-6 py-3 text-white bg-blue-900 rounded-md font-bold">
                                    My deals
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <ListOfProperties 
                            properties={properties} 
                            propertyImages={propertyImages}
                            pagination={userPropertiesPage}
                            onShowNext={(nextPage: number) => getUserProperties(userId, nextPage)}
                        />
                    </div>
                </PageContainer>
            </div>
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);