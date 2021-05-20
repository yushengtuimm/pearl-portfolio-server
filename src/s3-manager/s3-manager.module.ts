import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';
import { S3ManagerService } from './s3-manager.service';

@Module({
  imports: [AwsSdkModule.forFeatures([S3]), ConfigModule],
  providers: [S3ManagerService],
  exports: [S3ManagerService],
})
export class S3ManagerModule {}
