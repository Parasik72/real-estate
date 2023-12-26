import { asClass } from "awilix";
import { AuthService } from "./auth-user/auth-user.service";
import { DealService } from "./deal/deal.service";
import { PropertyService } from "./property/property.service";
import { UserService } from "./user/user.service";
import { ContainerKeys } from "../container/container.keys";
import { ToastifyService } from "./toastify/toastify.service";

export interface IServiceContainer {
    UserService: UserService;
    PropertyService: PropertyService;
    AuthService: AuthService;
    DealService: DealService;
    ToastifyService: ToastifyService;
}

export default {
    [ContainerKeys.UserService]: asClass(UserService).singleton(),
    [ContainerKeys.PropertyService]: asClass(PropertyService).singleton(),
    [ContainerKeys.AuthService]: asClass(AuthService).singleton(),
    [ContainerKeys.DealService]: asClass(DealService).singleton(),
    [ContainerKeys.ToastifyService]: asClass(ToastifyService).singleton()
}