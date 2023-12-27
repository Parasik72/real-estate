import { BaseService } from "@/common/services/base.service";
import { Schema, schema } from "normalizr";

const key = 'entities';

export interface InitSchemaReducer {
    definitions: Schema;
    options: schema.EntityOptions;
}

interface IReducerOptions {
    entityName: string;
    reducerFunc?: (state: any, action: any) => any;
    initSchema?: InitSchemaReducer;
}

export interface IReducer extends IReducerOptions {
    className: string;
}

export default function reducer(opts: IReducerOptions): (
    target: object
) => void {
    return (target: object): void => {
        let entities: IReducer[] = Reflect.getMetadata(key, BaseService) || [];
        entities.push({ ...opts, className: (target as any).name });
        Reflect.defineMetadata(key, entities, BaseService);
    };
}