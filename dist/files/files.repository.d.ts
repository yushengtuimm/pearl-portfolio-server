/// <reference types="mongoose-paginate-v2" />
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import { File, FileDocument, FileModel } from './schemas/file.schema';
export declare class FilesRepository {
    private readonly fileModel;
    constructor(fileModel: FileModel<FileDocument>);
    exist(fileFilterQuery: FilterQuery<File>): Promise<boolean>;
    findOne(fileFilterQuery: FilterQuery<File>): Promise<File>;
    find(fileFilterQuery: FilterQuery<File>, paginateOptions: PaginateOptions): Promise<PaginateResult<File>>;
    create(file: File): Promise<File>;
    findOneAndUpdate(fileFilterQuery: FilterQuery<File>, file: Partial<File>): Promise<File>;
    delete(fileFilterQuery: FilterQuery<File>): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
