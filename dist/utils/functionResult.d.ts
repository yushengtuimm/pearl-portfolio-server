import { HttpException } from '@nestjs/common';
export declare class FunctionResult<T> {
    success: boolean;
    details: string | object | HttpException;
    result_object: T;
    constructor({ success, details, result_object, }: {
        success: boolean;
        details?: string | object | HttpException;
        result_object?: T;
    });
}
