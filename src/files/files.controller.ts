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
import { Response } from 'express';
import { File } from './schemas/file.schema';
import { FunctionResult } from '../utils/functionResult';

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
  async findAll(@Query('type') type: string) {
    return this.filesService.findAllWithType(type);
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
