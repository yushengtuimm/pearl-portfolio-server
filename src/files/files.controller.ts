import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response, Request } from 'express';
import { File } from './schemas/file.schema';
import { FunctionResult } from '../utils/functionResult';
import { FilterQuery } from 'mongoose';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10))
  async upload(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<FunctionResult<File>[]> {
    return this.filesService.uploadFiles(files);
  }

  @Get()
  async findAll(@Query('type') type?: string) {
    let query: FilterQuery<File> = {};
    if (type) query.file_type = type;
    return this.filesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const { stream } = await this.filesService.findOne(id);
    return stream.pipe(res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
