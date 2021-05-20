import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cs: ConfigService) => ({
        uri: cs.get('MONGODB_URI'),
      }),
    }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cs: ConfigService) => {
          return {
            region: cs.get('AWS_REGION'),
            credentials: {
              accessKeyId: cs.get('AWS_ACCESS_KEY_ID'),
              secretAccessKey: cs.get('AWS_SECRET_ACCESS_KEY'),
            },
          };
        },
      },
    }),
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
