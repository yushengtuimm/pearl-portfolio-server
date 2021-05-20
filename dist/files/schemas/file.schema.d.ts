import { Document, Schema as MongooseSchema } from 'mongoose';
export declare type FileDocument = File & Document;
declare type BaseUrl = {
    url: string;
};
export declare type FileWithUrl = File & BaseUrl;
export declare class File {
    fileId: string;
    file_type: string;
    filename: string;
    updated?: Date;
}
export declare const FileSchema: MongooseSchema<Document<File, any>, import("mongoose").Model<any, any, any>, undefined>;
export {};
