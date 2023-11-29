import { PropertyForm } from "@/common/components/form/property-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { PropertyTypeForm } from "@/common/types/property.type";

export default function AddProperty() {
    return (
        <PageWrapper className="py-8 h-full">
            <PageContainer className="h-full">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="rounded-md shadow-md bg-indigo-50 max-w-xl w-full">
                        <h2 className="p-8 w-full text-center border-b-2 border-indigo-100 text-dark-blue font-bold text-3xl">
                            Add a property
                        </h2>
                        <PropertyForm type={PropertyTypeForm.ADD} />
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    )
}