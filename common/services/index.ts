import { asClass } from "awilix";
import { AuthService } from "./auth-user/auth-user.service";
import { DealService } from "./deal/deal.service";
import { PropertyService } from "./property/property.service";
import { UserService } from "./user/user.service";

export interface IServiceContainer {
    UserService: UserService;
    PropertyService: PropertyService;
    AuthService: AuthService;
    DealService: DealService;
}

export default {
    UserService: asClass(UserService).singleton(),
    PropertyService: asClass(PropertyService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    DealService: asClass(DealService).singleton()
}