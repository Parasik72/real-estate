import { PropertyForm } from "@/common/components/form/property-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { addPropertyInitForm } from "@/common/functions/property.functions";
import { AddPropertyDto } from "@/common/services/property/dto/add-property.dto";
import { PropertyEffectActions } from "@/common/services/property/property.service";
import { AddPropertyVariablesForm } from "@/common/types/property.type";
import { useState } from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

interface IDispatch {
    addProperty: (payload: {
        values: AddPropertyDto
    }) => {
        type: PropertyEffectActions.ADD_PROPERTY;
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<PropertyEffectActions>>): IDispatch => {
    return {
        addProperty: (payload: {
            values: AddPropertyDto
        }) => dispatch({ type: PropertyEffectActions.ADD_PROPERTY, payload })
    }
}

function AddProperty({ addProperty }: IDispatch) {
    const [images, setImages] = useState<FileList | null>(null)

    const onSubmit = (values: AddPropertyVariablesForm) => {
        if (!images) return;
        const addressLine2 = values.addressLine2;
        addProperty({
            values: {
                ...values, 
                images, 
                addressLine2: addressLine2 ? addressLine2 : null
            }
        });
    }
    return (
        <PageWrapper className="py-8 h-full">
            <PageContainer className="h-full">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="rounded-md shadow-md bg-indigo-50 max-w-xl w-full">
                        <h2 className="p-8 w-full text-center border-b-2 border-indigo-100 text-dark-blue font-bold text-3xl">
                            Add a property
                        </h2>
                        <PropertyForm 
                            data={addPropertyInitForm(onSubmit)} 
                            newImages={images} 
                            setNewImages={setImages} 
                        />
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    )
}

export default connect(null, mapDispatchToProps)(AddProperty);