import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { File } from './schemas/file.schema';
import { FilesRepository } from './files.repository';
import { FunctionResult } from '../utils/functionResult';
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import { FileWithUrlDto, fileDTO, paginateResult } from './dto/fileWithUrl.dto';
import Ppt2PngConverter from '../utils/ppt2png/Ppt2PngConverter';
import { join, extname } from 'path';
import {
  writeFileSync,
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  unlink,
} from 'fs';

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

        if (extention == 'pptx' || extention == 'ppt') {
          this.processPPT(filename, buffer, fileInfo.fileId);
        }

        return {
          success: true,
          result_object: fileInfo,
        };
      }),
    );
  }

  async processPPT(filename: string, buffer: Buffer, parentId: string) {
    // genereate temp file in root/public dir
    // this temp file will be use for file converter to process
    const dir = join(__dirname, 'public');
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    const tempFilePath = join(dir + '/' + filename);
    writeFileSync(tempFilePath, buffer);

    // convert ppt to pdf -> pdf to png
    const converter = Ppt2PngConverter.create({
      file: tempFilePath,
      output: dir + '/',
    });
    converter.convert();

    // read in all png files and upload to s3
    const tempFiles = readdirSync(dir);
    const pngFiles = tempFiles.filter((file) => extname(file) === '.png');
    for (const pngName of pngFiles) {
      this.uploadFilesAsync(dir, pngName, parentId);
    }

    // remove all temporary files
    tempFiles.forEach((item) => {
      unlink(join(dir, item), (err) => {
        if (err) {
          return;
        }
      });
    });
  }

  async uploadFilesAsync(dir: string, filename: string, parentId: string) {
    const buffer = readFileSync(join(dir, filename));
    const uploadResult = await this.s3Manager.uploadFileToBucket(buffer, 'png');

    // push new file id to childs of parent file
    const fileInfo = await this.filesRepository.create({
      fileId: uploadResult.Key,
      filename: filename,
      file_type: 'png',
    });
    const updateRes = await this.filesRepository.update(
      { fileId: parentId },
      { $push: { childs: fileInfo.fileId } },
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

  async findFile(filename: string): Promise<FileWithUrlDto | FileWithUrlDto[]> {
    console.log(filename);
    const doc = await this.filesRepository.findOne({ filename });
    if (doc) {
      if (doc.childs) {
        const res: FileWithUrlDto[] = [];
        for (const child of doc.childs) {
          const info = await this.filesRepository.findOne({ fileId: child });
          const url = await this.s3Manager.generatePresignedUrl(child);
          res.push(fileDTO(info, url));
        }
        return res;
      } else {
        const url = await this.s3Manager.generatePresignedUrl(doc.fileId);
        return fileDTO(doc, url);
      }
    }
    throw new NotFoundException(
      `cannot find file with name [${filename}] in cloud storage.`,
    );
  }

  async remove(id: string) {
    const fileInfo = await this.filesRepository.findOne({ fileId: id });
    if (fileInfo) {
      await this.filesRepository.delete({
        fileId: { $in: fileInfo.childs },
      });

      fileInfo.childs.forEach(async (pngFile) => {
        await this.s3Manager.delete(pngFile);
      });
    }

    const s3Res = await this.s3Manager.delete(id);
    const res = await this.filesRepository.delete({ fileId: id });
  }
}
