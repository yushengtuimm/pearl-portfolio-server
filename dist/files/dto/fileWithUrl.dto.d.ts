/// <reference types="mongoose-paginate-v2" />
import { PaginateResult } from 'mongoose';
import { File } from '../schemas/file.schema';
export declare class FileWithUrlDto {
    fileId: string;
    file_type: string;
    filename: string;
    updated: Date;
    childs: string[];
    url: string;
}
export declare function fileDTO(file: File, url: string): FileWithUrlDto;
export declare function paginateResult<T, R>(result: PaginateResult<T>, docs: R[]): PaginateResult<R>;
