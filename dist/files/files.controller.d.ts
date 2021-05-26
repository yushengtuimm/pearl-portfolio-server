/// <reference types="multer" />
/// <reference types="mongoose-paginate-v2" />
import { FilesService } from './files.service';
import { Response } from 'express';
import { File } from './schemas/file.schema';
import { FunctionResult } from '../utils/functionResult';
import { PaginateResult } from 'mongoose';
import { FileWithUrlDto } from './dto/fileWithUrl.dto';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    upload(files: Express.Multer.File[]): Promise<FunctionResult<File>[]>;
    findAll(type?: string, offset?: number, limit?: number): Promise<PaginateResult<FileWithUrlDto>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findFile(filename: string): Promise<FileWithUrlDto | FileWithUrlDto[]>;
    remove(id: string): Promise<void>;
}
