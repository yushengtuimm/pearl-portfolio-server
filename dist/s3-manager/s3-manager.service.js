"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ManagerService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const nest_aws_sdk_1 = require("nest-aws-sdk");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
let S3ManagerService = class S3ManagerService {
    constructor(s3, configService) {
        this.s3 = s3;
        this.configService = configService;
    }
    async listBucketContents(bucket) {
        const response = await this.s3.listObjectsV2({ Bucket: bucket }).promise();
        return response.Contents.map((c) => c.Key);
    }
    async getFileFromBucket(key) {
        const stream = await this.s3
            .getObject({
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Key: key,
        })
            .createReadStream();
        return { stream };
    }
    async generatePresignedUrl(key) {
        return this.s3.getSignedUrlPromise('getObject', {
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Key: key,
        });
    }
    async uploadFileToBucket(dataBuffer) {
        return this.s3
            .upload({
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Body: dataBuffer,
            Key: `${uuid_1.v4()}`,
        })
            .promise();
    }
};
S3ManagerService = __decorate([
    common_1.Injectable(),
    __param(0, nest_aws_sdk_1.InjectAwsService(aws_sdk_1.S3)),
    __metadata("design:paramtypes", [aws_sdk_1.S3,
        config_1.ConfigService])
], S3ManagerService);
exports.S3ManagerService = S3ManagerService;
//# sourceMappingURL=s3-manager.service.js.map