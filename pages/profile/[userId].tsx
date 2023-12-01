import { ListOfProperties } from "@/common/components/list-of-properties.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { UserInfo } from "@/common/components/profile/user-info.component";
import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import { UserModel } from "@/common/services/user/user.model";
import container from "@/server/container";
import { UserController } from "@/server/controllers/user.controller";
import { NextPageContext } from "next";
import Link from "next/link";

interface IProps {
    user: UserModel;
    userProperties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[];
}

interface IContext extends NextPageContext {
    query: {
        userId: string;
    }
}

export async function getServerSideProps(context: IContext) {
    const userController = container.resolve<UserController>('userController');
    return userController.getUserProfileByIdServerSideProps({ userId: context.query.userId });
}

export default function Profile({ user, userProperties }: IProps) {
    return (
        <PageWrapper>
            <PageContainer className="py-8">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                        User profile
                    </h2>
                    <div className="mt-4">
                        <UserInfo user={user} displayEditLink />
                    </div>
                </div>
            </PageContainer>
            <div className="py-8 bg-indigo-50 w-full">
                <PageContainer>
                    <div className="flex justify-between">
                        <h2 className="text-dark-blue text-3xl lg:text-4xl font-bold">
                            User's properties
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
                        <ListOfProperties properties={userProperties} />
                    </div>
                </PageContainer>
            </div>
        </PageWrapper>
    )
}