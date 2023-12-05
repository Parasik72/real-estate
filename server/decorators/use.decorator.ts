import 'reflect-metadata';
import { MiddlewareType } from '../types/controller.types';

export default function USE(middlewares: MiddlewareType | MiddlewareType[])
: (target: object, propertyKey: string) => void {
    return (target: any, propertyKey: string): void => {
        const middlewaresArr = Array.isArray(middlewares) ? middlewares : [middlewares];
        const key = propertyKey 
            ? target.constructor.name + '_' + propertyKey
            : target.name;
        const store = propertyKey ? target.constructor : target;
        let properties = Reflect.getMetadata(key, store);
        if (Array.isArray(properties?.USE)) {
            properties.USE.push(...middlewaresArr);
            return;
        }
        properties = { USE: middlewaresArr, ...properties };
        Reflect.defineMetadata(key, properties, store);
    }
}