import { ListOfProperties } from "@/common/components/list-of-properties.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { UserInfo } from "@/common/components/profile/user-info.component";
import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";
import { userService } from "@/common/services/user/user.service";
import { RootState } from "@/common/store/root.reducer";
import { SetProfileAction } from "@/common/store/user/user.action.interface";
import { setProfileAction } from "@/common/store/user/user.actions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface IState {
    profile?: UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] };
}
  
function mapStateToProps(state: RootState): IState {
  return { profile: state.userReducer.profile };
}

interface IDispatch {
    setProfile: (payload: UserModel & {
        Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] 
    }) => SetProfileAction
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatch => {
  return {
    setProfile: (
        payload: UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] }
    ) => dispatch(setProfileAction(payload))
  }
}

function Profile({ profile, setProfile }: IState & IDispatch) {
    const router = useRouter();
    useEffect(() => {
        if (!router.query.userId) return;
        const userId = router.query.userId as string || '';
        async function getProfile() {
            const data = await userService.getProfileByUserId(userId);
            if (data) setProfile(data);
        }
        getProfile();
    }, [router.query.userId]);
    if (!profile) return <div>Loading...</div>
    return (
        <PageWrapper>
            <PageContainer className="py-8">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                        User profile
                    </h2>
                    <div className="mt-4">
                        <UserInfo user={profile} displayEditLink />
                    </div>
                </div>
            </PageContainer>
            <div className="py-8 bg-indigo-50 w-full">
                <PageContainer>
                    <div className="flex justify-between">
                        <h2 className="text-dark-blue text-3xl lg:text-4xl font-bold">
                            User&apos;s properties
                        </h2>
                        <div className="flex gap-4">
                            <Link href="/offers/add" className="px-6 py-3 text-white bg-blue-900 rounded-md font-bold">
                                Add a property
                            </Link>
                            <Link href="/deals" className="px-6 py-3 text-white bg-blue-900 rounded-md font-bold">
                                My deals
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <ListOfProperties properties={profile.Properties} />
                    </div>
                </PageContainer>
            </div>
        </PageWrapper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);