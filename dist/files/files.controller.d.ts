/// <reference types="multer" />
import { FilesService } from './files.service';
import { Response } from 'express';
import { File } from './schemas/file.schema';
import { FunctionResult } from '../utils/functionResult';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    upload(files: Array<Express.Multer.File>): Promise<FunctionResult<File>[]>;
    findAll(type: string): Promise<import("./schemas/file.schema").FileWithUrl[]>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string): string;
}
