import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { S3ManagerModule } from '../s3-manager/s3-manager.module';
import { File, FileSchema } from './schemas/file.schema';
import { FilesRepository } from './files.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    S3ManagerModule,
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
})
export class FilesModule {}
