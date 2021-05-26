import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { S3ManagerModule } from '../s3-manager/s3-manager.module';
import { File, FileSchema } from './schemas/file.schema';
import { FilesRepository } from './files.repository';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: File.name,
        useFactory: () => {
          const schema = FileSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),
    // }),
    S3ManagerModule,
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
})
export class FilesModule {}
