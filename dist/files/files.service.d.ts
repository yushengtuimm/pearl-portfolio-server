/// <reference types="multer" />
/// <reference types="node" />
import { S3ManagerService } from 'src/s3-manager/s3-manager.service';
import { File, FileWithUrl } from './schemas/file.schema';
import { FilesRepository } from './files.repository';
import { FunctionResult } from 'src/utils/functionResult';
export declare class FilesService {
    private readonly filesRepository;
    private readonly s3Manager;
    constructor(filesRepository: FilesRepository, s3Manager: S3ManagerService);
    uploadFiles(files: Array<Express.Multer.File>): Promise<FunctionResult<File>[]>;
    findAllWithType(fileType: string): Promise<FileWithUrl[]>;
    findOne(fileId: string): Promise<{
        stream: import("stream").Readable;
    }>;
    remove(id: number): string;
}
