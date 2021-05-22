/// <reference types="multer" />
/// <reference types="mongoose-paginate-v2" />
/// <reference types="node" />
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { File } from './schemas/file.schema';
import { FilesRepository } from './files.repository';
import { FunctionResult } from '../utils/functionResult';
import { PaginateResult } from 'mongoose';
import { FileWithUrlDto } from './dto/fileWithUrl.dto';
export declare class FilesService {
    private readonly filesRepository;
    private readonly s3Manager;
    constructor(filesRepository: FilesRepository, s3Manager: S3ManagerService);
    uploadFiles(files: Array<Express.Multer.File>): Promise<FunctionResult<File>[]>;
    findAll(type: string, offset: number, limit: number): Promise<PaginateResult<FileWithUrlDto>>;
    findOne(fileId: string): Promise<{
        stream: import("stream").Readable;
    }>;
    remove(id: number): string;
}
