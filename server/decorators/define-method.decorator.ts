export const defineMethod = 
(methodName: string, routePath: string) => (target: object, propertyKey: string): void => {
    let properties = Reflect.getMetadata(routePath, target);
    if (Array.isArray(properties?.[methodName])) {
        properties[methodName].push(propertyKey);
        return;
    }
    properties = { ...properties, [methodName]: [propertyKey] };
    Reflect.defineMetadata(routePath, properties, target);
} 