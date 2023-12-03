import { ListOfProperties } from "@/common/components/list-of-properties.component";
import { FormSearch } from "@/common/components/offers/form-search.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { PropertyModel } from "@/common/services/property/property.model";
import container from "@/server/container";
import { PropertyController } from "@/server/controllers/property.controller";
import { tryCatchControllerSSR } from "@/server/wrappers/try-catch-controller-ssr.wrapper";
import { NextPageContext } from "next";

interface IProps {
    data: {
        properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[];
    }
}

export async function getServerSideProps(context: NextPageContext) {
    const propertyController: PropertyController = container.resolve<PropertyController>('propertyController');
    return tryCatchControllerSSR(propertyController.getAllOffers, context);
}

export default function Offers({ data }: IProps) {
    return (
        <PageWrapper>
            <PageContainer className="py-8">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-dark-blue text-4xl lg:text-6xl font-bold">
                        Search for an offer
                    </h2>
                    <p className="mt-4 text-dark-blue text-2xl leading-8 font-light max-w-xl">
                        Choose from the most advantageous offers
                    </p>
                </div>
            </PageContainer>
            <div className="py-8 bg-indigo-50 w-full">
                <PageContainer>
                    <FormSearch />
                </PageContainer>
            </div>
            <PageContainer className="py-8">
                <ListOfProperties properties={data.properties} />
            </PageContainer>
        </PageWrapper>
    )
}