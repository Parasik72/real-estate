import type { IModelContainer } from "@/db/models/model-container";
import type { IControllerContainer } from "../controllers";
import type { IServiceContainer } from "../services";
import type { Sequelize } from "sequelize";

export default interface IContextContainer 
extends IControllerContainer,
        IServiceContainer,
        IModelContainer 
{
    dbInstance: Sequelize;
} 