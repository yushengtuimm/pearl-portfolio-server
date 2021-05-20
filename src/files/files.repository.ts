import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { File, FileDocument } from './schemas/file.schema';

@Injectable()
export class FilesRepository {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<FileDocument>,
  ) {}

  async exist(fileFilterQuery: FilterQuery<File>): Promise<boolean> {
    const result = await this.fileModel.countDocuments(fileFilterQuery);
    if (result > 0) return true;
    else return false;
  }

  async findOne(fileFilterQuery: FilterQuery<File>): Promise<File> {
    return this.fileModel.findOne(fileFilterQuery);
  }

  async find(fileFilterQuery: FilterQuery<File>): Promise<File[]> {
    return this.fileModel.find(fileFilterQuery);
  }

  async create(file: File): Promise<File> {
    const newFile = new this.fileModel(file);
    return newFile.save();
  }

  async findOneAndUpdate(
    fileFilterQuery: FilterQuery<File>,
    file: Partial<File>,
  ): Promise<File> {
    return this.fileModel.findOneAndUpdate(fileFilterQuery, file);
  }
}
