import 'reflect-metadata';
import { defineMethod } from './define-method.decorator';

export default function SSR(routePath: string = '*')
: (target: object, propertyKey: string) => void {
    return defineMethod('SSR', routePath);
}