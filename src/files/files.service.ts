import {
  HttpException,
  Injectable,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { S3ManagerService } from 'src/s3-manager/s3-manager.service';
import { File, FileWithUrl } from './schemas/file.schema';
import { FilesRepository } from './files.repository';
import { Schema as MongooseSchema } from 'mongoose';
import { FunctionResult } from 'src/utils/functionResult';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly s3Manager: S3ManagerService,
  ) {}

  async uploadFiles(
    files: Array<Express.Multer.File>,
  ): Promise<FunctionResult<File>[]> {
    return Promise.all(
      files.map(async (file) => {
        const buffer = file.buffer;
        const filename = file.originalname;
        const exist = await this.filesRepository.exist({ filename: filename });
        if (exist) {
          return new FunctionResult<File>({
            success: false,
            details: new ConflictException(
              `file with name [${filename}] already uploaded to the cloud storage.`,
            ).getResponse(),
          });
        }
        const extention = filename.split('.').pop();
        const uploadResult = await this.s3Manager.uploadFileToBucket(buffer);

        const fileInfo = await this.filesRepository.create({
          fileId: uploadResult.Key,
          filename: filename,
          file_type: extention,
        });

        return new FunctionResult<File>({
          success: true,
          result_object: fileInfo,
        });
      }),
    );
  }

  async findAllWithType(fileType: string): Promise<FileWithUrl[]> {
    const fileInfos = await this.filesRepository.find({
      file_type: fileType,
    });
    return Promise.all(
      fileInfos.map(async (file) => {
        const url = await this.s3Manager.generatePresignedUrl(file.fileId);
        const result: FileWithUrl = {
          fileId: file.fileId,
          file_type: file.file_type,
          filename: file.filename,
          url: url,
        };
        return result;
      }),
    );
  }

  async findOne(fileId: string) {
    const fileInfo = await this.filesRepository.findOne({ fileId });
    if (fileInfo) {
      return this.s3Manager.getFileFromBucket(fileInfo.fileId);
    }
    throw new NotFoundException(
      `cannot find file with name [${fileInfo.filename}] in cloud storage.`,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
