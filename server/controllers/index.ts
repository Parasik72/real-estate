import type { PropertyController } from "./property.controller";
import type { UserController } from "./user.controller";
import type { DealController } from "./deal.controller";
import { ApiContainerKeys } from "../contaier.keys";

export interface IControllerContainer {
    [ApiContainerKeys.PropertyController]: PropertyController;
    [ApiContainerKeys.UserController]: UserController;
    [ApiContainerKeys.DealController]: DealController;
}