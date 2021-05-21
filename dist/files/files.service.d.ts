/// <reference types="multer" />
/// <reference types="node" />
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { File } from './schemas/file.schema';
import { FilesRepository } from './files.repository';
import { FunctionResult } from '../utils/functionResult';
import { FileWithUrlDto } from './dto/fileWithUrl.dto';
import { FilterQuery } from 'mongoose';
export declare class FilesService {
    private readonly filesRepository;
    private readonly s3Manager;
    constructor(filesRepository: FilesRepository, s3Manager: S3ManagerService);
    uploadFiles(files: Array<Express.Multer.File>): Promise<FunctionResult<File>[]>;
    findAll(filterQuery: FilterQuery<File>): Promise<FileWithUrlDto[]>;
    findOne(fileId: string): Promise<{
        stream: import("stream").Readable;
    }>;
    remove(id: number): string;
}
