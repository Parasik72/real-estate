import { asClass } from "awilix";
import { PropertyController } from "./property.controller";
import { UserController } from "./user.controller";
import { DealController } from "./deal.controller";

export interface IControllerContainer {
    propertyController: PropertyController;
    userController: UserController;
    dealController: DealController;
}

export default {
    propertyController: asClass(PropertyController).singleton(),
    userController: asClass(UserController).singleton(),
    dealController: asClass(DealController).singleton(),
}