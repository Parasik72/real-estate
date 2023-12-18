import { BaseService } from "@/common/services/base.service";

export default function action(): (
    target: object,
    propertyKey: string,
) => void {
    return (target: object, methodName: string): void => {
        let sagas: object[] = Reflect.getMetadata('sagas', BaseService) || [];
        sagas.push({className: target.constructor.name, methodName});
        Reflect.defineMetadata('sagas', sagas, BaseService);
    };
}