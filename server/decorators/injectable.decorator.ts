import 'reflect-metadata';

export default function INJECTABLE()
: (target: object) => void {
    return (target: any): void => {
        let properties = Reflect.getMetadata(target.name, target);
        if (!properties) properties = {};
        properties = { isInjectable: true, ...properties };
        Reflect.defineMetadata(target.name, properties, target);
    }
}