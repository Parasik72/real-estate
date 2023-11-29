import { ProfileForm } from "@/common/components/form/profile-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { ProfileTypeForm } from "@/common/types/profile.type";

export default function EditProfile() {
    return (
        <PageWrapper className="py-8 h-full">
            <PageContainer className="h-full">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="rounded-md shadow-md bg-indigo-50 max-w-xl w-full">
                        <h2 className="p-8 w-full text-center border-b-2 border-indigo-100 text-dark-blue font-bold text-3xl">
                            Edit the personal info
                        </h2>
                        <ProfileForm type={ProfileTypeForm.EDIT_PERSONAL_INFO} />
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    )
}