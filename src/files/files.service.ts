import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { File } from './schemas/file.schema';
import { FilesRepository } from './files.repository';
import { FunctionResult } from '../utils/functionResult';
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import { FileWithUrlDto, fileDTO, paginateResult } from './dto/fileWithUrl.dto';

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
          return {
            success: false,
            details: new ConflictException(
              `file with name [${filename}] already uploaded to the cloud storage.`,
            ).getResponse(),
          };
        }

        const extention = filename.split('.').pop();
        const uploadResult = await this.s3Manager.uploadFileToBucket(
          buffer,
          extention,
        );

        const fileInfo = await this.filesRepository.create({
          fileId: uploadResult.Key,
          filename: filename,
          file_type: extention,
        });

        return {
          success: true,
          result_object: fileInfo,
        };
      }),
    );
  }

  async findAll(
    type: string,
    offset: number,
    limit: number,
  ): Promise<PaginateResult<FileWithUrlDto>> {
    let query: FilterQuery<File> = {};
    if (type) query.file_type = type;

    let option: PaginateOptions = {
      offset: offset,
      limit: limit,
    };

    const fileInfos = await this.filesRepository.find(query, option);
    const newDocs: FileWithUrlDto[] = [];
    for (const doc of fileInfos.docs) {
      const url = await this.s3Manager.generatePresignedUrl(doc.fileId);
      newDocs.push(fileDTO(doc, url));
    }

    const newFileInfos: PaginateResult<FileWithUrlDto> = paginateResult<
      File,
      FileWithUrlDto
    >(fileInfos, newDocs);
    return newFileInfos;
  }

  async findOne(fileId: string) {
    const doc = await this.filesRepository.findOne({ fileId });
    if (doc) {
      return this.s3Manager.getFileFromBucket(doc.fileId);
    }
    throw new NotFoundException(
      `cannot find file with name [${doc.filename}] in cloud storage.`,
    );
  }

  async findFile(filename: string): Promise<FileWithUrlDto> {
    const doc = await this.filesRepository.findOne({ filename });
    if (doc) {
      const url = await this.s3Manager.generatePresignedUrl(doc.fileId);
      return fileDTO(doc, url);
    }
    throw new NotFoundException(
      `cannot find file with name [${doc.filename}] in cloud storage.`,
    );
  }

  async remove(id: string) {
    const s3Res = await this.s3Manager.delete(id);
    const res = await this.filesRepository.delete({ fileId: id });
  }
}
