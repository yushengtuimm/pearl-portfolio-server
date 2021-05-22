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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response, Request } from 'express';
import { File } from './schemas/file.schema';
import { FunctionResult } from '../utils/functionResult';
import { PaginateResult } from 'mongoose';
import { FileWithUrlDto } from './dto/fileWithUrl.dto';

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
  async findAll(
    @Query('type') type?: string,
    @Query('offset') offset = 0,
    @Query('limit') limit = 5,
  ): Promise<PaginateResult<FileWithUrlDto>> {
    return this.filesService.findAll(type, offset, limit);
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
