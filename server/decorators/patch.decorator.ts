import 'reflect-metadata';
import { defineMethod } from './define-method.decorator';

export default function PATCH(routePath: string = '*')
: (target: object, propertyKey: string) => void {
    return defineMethod('PATCH', routePath);
}