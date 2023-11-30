import { asClass } from "awilix";
import { PropertyController } from "./property.controller";
import { UserController } from "./user.controller";

export default {
    propertyController: asClass(PropertyController).singleton(),
    userController: asClass(UserController).singleton(),
}