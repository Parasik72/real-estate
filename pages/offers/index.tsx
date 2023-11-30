import { ListOfProperties } from "@/common/components/list-of-properties.component";
import { FormSearch } from "@/common/components/offers/form-search.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { PropertyModel } from "@/common/services/property/property.model";
import { propertyService } from "@/common/services/property/property.service";

interface IProps {
    offers: PropertyModel[];
}

export async function getServerSideProps() {
    const offers = await propertyService.getAllOffers();
    return { props: { offers: JSON.parse(JSON.stringify(offers)) } };
}

export default function Offers({ offers }: IProps) {
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
                <ListOfProperties properties={offers} />
            </PageContainer>
        </PageWrapper>
    )
}