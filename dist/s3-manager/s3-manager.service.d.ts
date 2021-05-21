/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
export declare class S3ManagerService {
    private readonly s3;
    private readonly configService;
    constructor(s3: S3, configService: ConfigService);
    listBucketContents(bucket: string): Promise<string[]>;
    getFileFromBucket(key: string): Promise<{
        stream: import("stream").Readable;
    }>;
    generatePresignedUrl(key: string): Promise<string>;
    uploadFileToBucket(dataBuffer: Buffer, file_ext: string): Promise<S3.ManagedUpload.SendData>;
}
