import 'reflect-metadata';

export default function MESSAGE(msg: string)
: (target: object, propertyKey: string) => void {
    return (target: object, propertyKey: string): void => {
        const name = target.constructor.name + '_' + propertyKey;
        let properties = Reflect.getMetadata(name, target.constructor);
        if (!properties) properties = {};
        properties.msg = msg;
        Reflect.defineMetadata(name, properties, target.constructor);
    }
}