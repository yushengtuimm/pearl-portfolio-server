import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3ManagerService {
  constructor(
    @InjectAwsService(S3) private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  async listBucketContents(bucket: string): Promise<string[]> {
    const response = await this.s3.listObjectsV2({ Bucket: bucket }).promise();
    return response.Contents.map((c) => c.Key);
  }

  async getFileFromBucket(key: string) {
    const stream = await this.s3
      .getObject({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: key,
      })
      .createReadStream();
    return { stream };
  }

  async generatePresignedUrl(key: string) {
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: key,
    });
  }

  async uploadFileToBucket(
    dataBuffer: Buffer,
    file_ext: string,
  ): Promise<S3.ManagedUpload.SendData> {
    let contentType = 'application/octet-stream';
    switch (file_ext) {
      case 'pdf':
        contentType = 'application/pdf';
      case 'jpg':
        contentType = 'image/jpeg';
      case 'png':
        contentType = 'image/png';
    }

    return this.s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid() + '.' + file_ext}`,
        ContentType: contentType,
      })
      .promise();
  }

  async delete(key: string) {
    return this.s3
      .deleteObject({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: key,
      })
      .promise();
  }
}
