import { HttpException } from '@nestjs/common';

export type FunctionResult<T> = {
  success: boolean;
  details?: string | object | HttpException;
  result_objects?: T;
};
