import { asClass } from "awilix";
import { AuthService } from "./auth-user/auth-user.service";
import { DealService } from "./deal/deal.service";
import { PropertyService } from "./property/property.service";
import { UserService } from "./user/user.service";
import { ContainerKeys } from "../container/container.keys";

export interface IServiceContainer {
    UserService: UserService;
    PropertyService: PropertyService;
    AuthService: AuthService;
    DealService: DealService;
}

export default {
    [ContainerKeys.UserService]: asClass(UserService).singleton(),
    [ContainerKeys.PropertyService]: asClass(PropertyService).singleton(),
    [ContainerKeys.AuthService]: asClass(AuthService).singleton(),
    [ContainerKeys.DealService]: asClass(DealService).singleton()
}