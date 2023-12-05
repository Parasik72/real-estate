import 'reflect-metadata';
import { defineMethod } from './define-method.decorator';

export default function POST(routePath: string = '*')
: (target: object, propertyKey: string) => void {
    return defineMethod('POST', routePath);
}