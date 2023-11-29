import { ListOfDeals } from "@/common/components/deals/list-of-deals.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";

export default function Deals() {
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
                        <ListOfDeals displayCancelBtn />
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
                    <ListOfDeals displaySignBtn displayCancelBtn />
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
                        <ListOfDeals />
                    </div>
                </PageContainer>
            </div>
        </PageWrapper>
    )
}