/// <reference types="mongoose-paginate-v2" />
import { Document, PaginateModel } from 'mongoose';
export declare type FileDocument = File & Document;
export interface FileModel<T extends Document> extends PaginateModel<T> {
}
export declare class File {
    fileId: string;
    file_type: string;
    filename: string;
    childs?: string[];
    updated?: Date;
}
export declare const FileSchema: import("mongoose").Schema<Document<File, any>, import("mongoose").Model<any, any, any>, undefined>;
