import 'reflect-metadata';

export default function CONTROLLER(routePath: string = '')
: (target: object) => void {
    return (target: any): void => {
        let properties = Reflect.getMetadata(target.name, target);
        if (!properties) properties = {};
        properties = { CONTROLLER: { routePath }, ...properties };
        Reflect.defineMetadata(target.name, properties, target);
    }
}