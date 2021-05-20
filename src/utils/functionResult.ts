import { HttpException } from '@nestjs/common';

export class FunctionResult<T> {
  success: boolean;
  details: string | object | HttpException;
  result_object: T;

  constructor({
    success,
    details,
    result_object,
  }: {
    success: boolean;
    details?: string | object | HttpException;
    result_object?: T;
  }) {
    this.success = success;
    this.details = details;
    this.result_object = result_object;
  }
}
