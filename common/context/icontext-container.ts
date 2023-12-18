import { IServiceContainer } from "../services/index";
import { ReduxStore } from "../store/redux.store";

export default interface IContextContainer 
extends IServiceContainer
{
    reduxStore: ReduxStore;
} 