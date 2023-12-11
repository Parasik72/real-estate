import { ListOfProperties } from "@/common/components/list-of-properties.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { UserInfo } from "@/common/components/profile/user-info.component";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";
import { RootState } from "@/common/store/root.reducer";
import { UserEffectActions } from "@/common/store/saga-effects/user.saga-effects";
import { StoreEntity } from "@/common/store/types/store.types";
import { AuthUser } from "@/common/store/user/user.state.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IState {
    users: StoreEntity<UserModel>;
    properties: PropertyModel[];
    authUser: AuthUser;
}
  
function mapStateToProps(state: RootState): IState {
  const properties = state.propertyReducer.entities.properties;
  return { 
    users: state.userReducer.entities.users,
    properties: properties ? Object.values(properties) : [],
    authUser: state.userReducer.authUser
  };
}

interface IDispatch {
    getProfile: (userId: string) => {
        type: UserEffectActions;
        payload: {
            userId: string;
        };
    }  
}

const mapDispatchToProps = (dispatch: Dispatch<Action<UserEffectActions>>): IDispatch => {
  return {
    getProfile: (userId: string) => 
        dispatch({ type: UserEffectActions.GET_USER_PROFILE, payload: { userId } })
  }
}

function Profile({ users, properties, getProfile, authUser }: IState & IDispatch) {
    const router = useRouter();
    const userId = router.query.userId as string || '';
    useEffect(() => {
        if (!userId) return;
        getProfile(userId);
    }, [userId]);
    if (!users[userId]) return <div>Loading...</div>
    const isCurrentUserProfile = authUser.isAuth && userId === authUser.userId;
    return (
        <PageWrapper>
            <PageContainer className="py-8">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                        User profile
                    </h2>
                    <div className="mt-4">
                        <UserInfo 
                            user={users[userId]} 
                            displayEditLink={isCurrentUserProfile} 
                        />
                    </div>
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
                        <ListOfProperties properties={properties} />
                    </div>
                </PageContainer>
            </div>
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);