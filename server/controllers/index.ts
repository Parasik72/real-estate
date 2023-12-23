import { asClass } from "awilix";
import { PropertyController } from "./property.controller";
import { UserController } from "./user.controller";
import { DealController } from "./deal.controller";
import { ApiContainerKeys } from "../contaier.keys";

export interface IControllerContainer {
    [ApiContainerKeys.PropertyController]: PropertyController;
    [ApiContainerKeys.UserController]: UserController;
    [ApiContainerKeys.DealController]: DealController;
}

export default {
    [ApiContainerKeys.PropertyController]: asClass(PropertyController).singleton(),
    [ApiContainerKeys.UserController]: asClass(UserController).singleton(),
    [ApiContainerKeys.DealController]: asClass(DealController).singleton(),
}