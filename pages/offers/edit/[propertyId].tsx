import { PropertyForm } from "@/common/components/form/property-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { editPropertyInitForm } from "@/common/functions/property.functions";
import { PropertyModel } from "@/common/services/property/property.model";
import { Entity } from "@/common/store/types/store.types";
import { EditPropertyVariablesForm } from "@/common/types/property.type";
import { useRouter } from "next/router";
import { RootState } from '@/common/store/root.reducer';
import { Action, Dispatch } from "redux";
import { connect } from "react-redux";
import { EditPropertyDto } from "@/common/services/property/dto/edit-roperty.dto";
import { PropertyImageModel } from "@/common/services/property/property-image.model";
import { PropertyEffectActions } from "@/common/services/property/property.service";
import apiContainer from "@/server/container";
import container from "@/common/container/container";
import { ReduxStore } from "@/common/store/redux.store";
import { ContainerKeys } from "@/common/container/container.keys";
import { ApiContainerKeys } from "@/server/contaier.keys";
import { useState } from "react";

interface IState {
    properties: Entity<PropertyModel>;
    propertyImages: Entity<PropertyImageModel>;
}
  
function mapStateToProps(state: RootState): IState {
  return { 
    properties: state.properties,
    propertyImages: state.propertyImages
  }
}

interface IDispatch {
    getProperty: (propertyId: string) => {
        type: PropertyEffectActions.GET_PROPERTY;
        payload: string;
    };
    editProperty: (payload: {
        property: PropertyModel, 
        values: EditPropertyDto,
        propertyImagesIds: string[],
        newImages: FileList | null
    }) => {
        type: PropertyEffectActions.EDIT_PROPERTY;
        payload: {
            property: PropertyModel, 
            values: EditPropertyDto,
            propertyImagesIds: string[],
            newImages: FileList | null
        };
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<PropertyEffectActions>>): IDispatch => {
  return {
    getProperty: (propertyId: string) => 
        dispatch({ type: PropertyEffectActions.GET_PROPERTY, payload: propertyId }),
    editProperty: (payload: {
        property: PropertyModel, 
        values: EditPropertyDto,
        propertyImagesIds: string[],
        newImages: FileList | null
    }) =>
        dispatch({ type: PropertyEffectActions.EDIT_PROPERTY, payload })
  }
}

export const getServerSideProps = container.resolve<ReduxStore>(ContainerKeys.ReduxStore)
  .getServerSideProps(
    apiContainer, [
        {
            routePath: '/properties/:propertyId',
            apiControllerName: ApiContainerKeys.PropertyController,
            serviceName: ContainerKeys.PropertyService
        },
    ]
  );

function EditProperty({ properties, propertyImages, editProperty }: IState & IDispatch) {
    const [newImages, setNewImages] = useState<FileList | null>(null);
    const router = useRouter();
    const propertyId = router.query.propertyId as string || '';
    const property = properties[propertyId];
    const propertyImagesFiltered = Object.keys(propertyImages).reduce((result: any, key) => {
        if (propertyImages[key].propertyId === propertyId) {
            result[key] = propertyImages[key];
        }
        return result;
    }, {});

    const onSubmit = (values: EditPropertyVariablesForm) => {
        editProperty({
            newImages,
            property,
            propertyImagesIds: Object.keys(propertyImages) || [],
            values
        });
    }

    if (!property) return <div>Loading...</div>;
    return (
        <PageWrapper className="py-8 h-full">
            <PageContainer className="h-full">
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="rounded-md shadow-md bg-indigo-50 max-w-xl w-full">
                        <h2 className="p-8 w-full text-center border-b-2 border-indigo-100 text-dark-blue font-bold text-3xl">
                            Edit the property
                        </h2>
                        <PropertyForm 
                            data={editPropertyInitForm(property, onSubmit)} 
                            newImages={newImages}
                            setNewImages={setNewImages}
                            propertyImages={propertyImagesFiltered}
                        />
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProperty);