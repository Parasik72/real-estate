import { PropertyForm } from "@/common/components/form/property-form.component";
import { PageContainer } from "@/common/components/page-container.component";
import { PageWrapper } from "@/common/components/page-wrapper.component";
import { editPropertyInitForm } from "@/common/functions/property.functions";
import { PropertyModel } from "@/common/services/property/property.model";
import { Entity, StoreEntity } from "@/common/store/types/store.types";
import { EditPropertyVariablesForm } from "@/common/types/property.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RootState } from '@/common/store/root.reducer';
import { PropertyEffectActions } from "@/common/store/saga-effects/property.saga-effects";
import { Action, Dispatch } from "redux";
import { connect } from "react-redux";
import { PropertyAddressModel } from "@/common/services/property/property-address.model";
import { EditPropertyDto } from "@/common/services/property/dto/edit-roperty.dto";
import { FRONT_PATHS } from "@/common/constants/front-paths.constants";
import { PropertyImageModel } from "@/common/services/property/property-image.model";

interface IState {
    properties: Entity<PropertyModel>;
    propertyImagesStore: StoreEntity<PropertyImageModel>;
}
  
function mapStateToProps(state: RootState): IState {
  return { 
    properties: state.propertyReducer.entities.properties.byId,
    propertyImagesStore: state.propertyReducer.entities.propertyImages
  }
}

interface IDispatch {
    getProperty: (propertyId: string) => {
        type: PropertyEffectActions.GET_PROPERTY;
        payload: {
            propertyId: string;
        };
    };
    editProperty: (propertyId: string, values: EditPropertyDto, callback: () => void) => {
        type: PropertyEffectActions.EDIT_PROPERTY;
        payload: {
            propertyId: string;
            values: EditPropertyDto;
            callback: () => void;
        };
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<PropertyEffectActions>>): IDispatch => {
  return {
    getProperty: (propertyId: string) => 
        dispatch({ type: PropertyEffectActions.GET_PROPERTY, payload: { propertyId } }),
    editProperty: (
        propertyId: string, values: EditPropertyDto, callback: () => void
    ) =>
        dispatch({ type: PropertyEffectActions.EDIT_PROPERTY, payload: { propertyId, values, callback } })
  }
}

function EditProperty({ properties, propertyImagesStore, getProperty, editProperty }: IState & IDispatch) {
    const [newImages, setNewImages] = useState<FileList | null>(null);
    const router = useRouter();
    const propertyId = router.query.propertyId as string || '';
    const property = properties[propertyId];

    const onSubmit = (values: EditPropertyVariablesForm) => {
        if (propertyImagesStore.allIds.length > 0 &&
            values.imgsToDeleteIds?.length === propertyImagesStore.allIds.length) return;
        const data: EditPropertyDto = {...values};
        Object.entries(values).forEach((value) => {
            if (value[1] === property[value[0] as keyof typeof property]) {
                delete data[value[0] as keyof typeof data];
            } else if (property?.PropertyAddress
                && value[1] as any === property!.PropertyAddress[value[0] as keyof PropertyAddressModel]) {
                    delete data[value[0] as keyof typeof data];
            } else if (Array.isArray(value[1]) && value[1].length === 0) {
                delete data[value[0] as keyof typeof data];
            }
        });
        if (newImages) data['images'] = newImages;
        else delete data['images'];
        const callback = () => router.push(FRONT_PATHS.offerById.replace(':propertyId', propertyId));
        if (Object.values(data).length !== 0) {
            return editProperty(
                propertyId, 
                data, 
                callback
            );
        }
        callback();
    }

    useEffect(() => {
        if (!propertyId) return;
        getProperty(propertyId);
    }, [propertyId]);

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
                            propertyImagesStore={propertyImagesStore}
                        />
                    </div>
                </div>
            </PageContainer>
        </PageWrapper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProperty);