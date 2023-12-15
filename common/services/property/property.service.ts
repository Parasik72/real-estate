import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { PropertyModel } from "./property.model";
import { GetAllOffersParams, PropertiesPageResponse } from "./property-http.types";
import { PropertyAddressModel } from "./property-address.model";
import { UserModel } from "../user/user.model";
import { AddPropertyDto } from "./dto/add-property.dto";
import { EditPropertyDto } from "./dto/edit-roperty.dto";
import { schema } from "normalizr";
import { call, take, takeEvery } from "redux-saga/effects";
import { generateQueryString } from "@/common/functions/http.functions";
import { ReducerMethods } from "@/common/store/reducer.methods";
import { SagaEffectAction } from "@/common/store/types/saga.types";
import { Entities } from "@/common/store/entities/entities.enum";

export enum PropertyEffectActions {
    GET_LAST_OFFERS = 'GET_LAST_OFFERS',
    GET_ALL_OFFERS = 'GET_ALL_OFFERS',
    GET_PROPERTY = 'GET_PROPERTY',
    ADD_PROPERTY = 'ADD_PROPERTY',
    EDIT_PROPERTY = 'EDIT_PROPERTY',
    GET_USER_PROPERTIES = 'GET_USER_PROPERTIES'
}

class PropertyService extends HttpService {
    constructor() {
        super();
        const propertyImageSchema = new schema.Entity('propertyImages', {}, { idAttribute: 'propertyImageId' });
        const userSchema = new schema.Entity('users', {}, { idAttribute: 'userId' });
        this.initSchema(
            'properties',
            { PropertyImages: [propertyImageSchema], User: userSchema }, 
            { idAttribute: 'propertyId' }
        );
    }

    public *getLastOffers() {
        yield takeEvery(
            PropertyEffectActions.GET_LAST_OFFERS, 
            this.get<(PropertyModel & { PropertyAddress: PropertyAddressModel; })[]>, 
            { 
                url: BACK_PATHS.getLastOffers,
                cleanEntities: [Entities.Property, Entities.PropertyImage] 
            },
            ReducerMethods.UPDATE
        );
    }

    public *getAllOffers() {
        while (true) {
            const action: SagaEffectAction<GetAllOffersParams> = yield take(PropertyEffectActions.GET_ALL_OFFERS);
            const queryStr = generateQueryString(action.payload);
            yield call(
                this.get<PropertiesPageResponse>, 
                { 
                    url: `${BACK_PATHS.getAllOffers}${queryStr}`,
                    cleanEntities: action.payload.page === 1 
                        ? [Entities.Property, Entities.PropertyImage] 
                        : []
                },
                ReducerMethods.UPDATE
            );
        }
    }

    public *getUserProperties() {
        while (true) {
            const action: SagaEffectAction<{
                userId: string, page?: number, limit?: number
            }> = yield take(PropertyEffectActions.GET_USER_PROPERTIES);
            const queryStr = generateQueryString({ page: action.payload.page, limit: action.payload.limit });
            yield call(
                this.get<PropertiesPageResponse>, 
                { 
                    url: `${BACK_PATHS.getUserProperties
                        .replace(':userId', action.payload.userId)}${queryStr}`,
                    cleanEntities: action.payload.page === 1 
                        ? [Entities.Property, Entities.PropertyImage] 
                        : []
                },
                ReducerMethods.UPDATE
            );
        }
    }

    public *getPropertyById() {
        while (true) {
            const action: SagaEffectAction<string> = yield take(PropertyEffectActions.GET_PROPERTY);
            yield call (
                this.get<PropertyModel & {PropertyAddress: PropertyAddressModel, User: UserModel}>, 
                { 
                    url: BACK_PATHS.getPropertyById.replace(':propertyId', action.payload),
                    cleanEntities: [Entities.PropertyImage]
                },
                ReducerMethods.UPDATE
            );
        }
    }

    public *addProperty() {
        while (true) {
            const action: SagaEffectAction<{
                values: AddPropertyDto,
                callback: (propertyId: string) => void
            }> = yield take(PropertyEffectActions.ADD_PROPERTY);
            const res: { property: PropertyModel } = yield call(
                this.post<FormData, {property: PropertyModel}>, 
                { url: BACK_PATHS.addProperty,
                    body: this.toFormData(action.payload.values) 
                },
                ReducerMethods.UPDATE
            );
            if (res instanceof Error) continue;
            action.payload.callback(res.property.propertyId);
        }
    }

    public *editProperty() {
        while (true) {
            const action: SagaEffectAction<{
                values: EditPropertyDto, propertyId: string, callback: () => void
            }> = yield take(PropertyEffectActions.EDIT_PROPERTY);
            const res: Object = yield call(
                this.patch<FormData, { message: string }>, 
                { 
                    url: BACK_PATHS.editProperty.replace(':propertyId', action.payload.propertyId),
                    body: this.toFormData(action.payload.values)
                },
                ReducerMethods.UPDATE
            );
            if (res instanceof Error) continue;
            action.payload.callback();
        }
    }
}

export const propertyService = new PropertyService;