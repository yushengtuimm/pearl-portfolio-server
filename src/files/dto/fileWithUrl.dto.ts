import { IsString, IsDate, IsUrl, IsArray } from 'class-validator';
import { PaginateResult } from 'mongoose';
import { File } from '../schemas/file.schema';

export class FileWithUrlDto {
  @IsString()
  fileId: string;

  @IsString()
  file_type: string;

  @IsString()
  filename: string;

  @IsDate()
  updated: Date;

  @IsArray()
  childs: string[];

  @IsUrl()
  url: string;
}

export function fileDTO(file: File, url: string): FileWithUrlDto {
  return {
    fileId: file.fileId,
    file_type: file.file_type,
    filename: file.filename,
    updated: file.updated,
    childs: file.childs,
    url: url,
  };
}

export function paginateResult<T, R>(
  result: PaginateResult<T>,
  docs: R[],
): PaginateResult<R> {
  return {
    docs: docs,
    totalDocs: result.totalDocs,
    offset: result.offset as number,
    limit: result.limit,
    totalPages: result.totalPages,
    page: result.page,
    pagingCounter: result.pagingCounter,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
  };
}
