import { BaseService } from "@/common/services/base.service";

const key = 'pagers';

export interface PagerReducer {
    className: string;
    methodName: string;
    pagerName: string;
}

export default function pager(pagerName: string): (
    target: object,
    propertyKey: string,
) => void {
    return (target: object, methodName: string): void => {
        let pagers: PagerReducer[] = Reflect.getMetadata(key, BaseService) || [];
        pagers.push({ className: target.constructor.name, methodName, pagerName });
        Reflect.defineMetadata(key, pagers, BaseService);
    };
}