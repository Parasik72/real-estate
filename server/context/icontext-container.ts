import { IModelContainer } from "@/db/models/model-container";
import { IControllerContainer } from "../controllers";
import { IServiceContainer } from "../services";
import { Sequelize } from "sequelize";

export default interface IContextContainer 
extends IControllerContainer,
        IServiceContainer,
        IModelContainer 
{
    dbInstance: Sequelize;
} 