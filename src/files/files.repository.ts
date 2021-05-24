import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import { File, FileDocument, FileModel } from './schemas/file.schema';

@Injectable()
export class FilesRepository {
  constructor(
    @InjectModel(File.name) private readonly fileModel: FileModel<FileDocument>,
  ) {}

  async exist(fileFilterQuery: FilterQuery<File>): Promise<boolean> {
    const result = await this.fileModel.countDocuments(fileFilterQuery);
    if (result > 0) return true;
    else return false;
  }

  async findOne(fileFilterQuery: FilterQuery<File>): Promise<File> {
    return this.fileModel.findOne(fileFilterQuery);
  }

  async find(
    fileFilterQuery: FilterQuery<File>,
    paginateOptions: PaginateOptions,
  ): Promise<PaginateResult<File>> {
    return this.fileModel.paginate(fileFilterQuery, paginateOptions);
  }

  async create(file: File): Promise<File> {
    const newFile = file;
    return this.fileModel.create(newFile);
  }

  async findOneAndUpdate(
    fileFilterQuery: FilterQuery<File>,
    file: Partial<File>,
  ): Promise<File> {
    return this.fileModel.findOneAndUpdate(fileFilterQuery, file);
  }

  async delete(fileFilterQuery: FilterQuery<File>) {
    return this.fileModel.deleteOne(fileFilterQuery);
  }
}
