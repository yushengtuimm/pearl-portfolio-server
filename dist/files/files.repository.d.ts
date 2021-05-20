import { FilterQuery, Model } from 'mongoose';
import { File, FileDocument } from './schemas/file.schema';
export declare class FilesRepository {
    private readonly fileModel;
    constructor(fileModel: Model<FileDocument>);
    exist(fileFilterQuery: FilterQuery<File>): Promise<boolean>;
    findOne(fileFilterQuery: FilterQuery<File>): Promise<File>;
    find(fileFilterQuery: FilterQuery<File>): Promise<File[]>;
    create(file: File): Promise<File>;
    findOneAndUpdate(fileFilterQuery: FilterQuery<File>, file: Partial<File>): Promise<File>;
}
