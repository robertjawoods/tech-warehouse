import { Request, Response } from "express";

export function authenticate(): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {

            const request = args[0] as Request;
            const response = args[1] as Response;
            const next = args[2];

            const headers = request.headers;

            next();
        }
    }
}