import type IContextContainer from "./icontext-container";

export default class BaseContext {
    constructor(protected di: IContextContainer) {}
}