exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 14:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3ManagerService = void 0;
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(10);
const aws_sdk_1 = __webpack_require__(15);
const nest_aws_sdk_1 = __webpack_require__(7);
const uuid_1 = __webpack_require__(16);
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
    async uploadFileToBucket(dataBuffer, file_ext) {
        let contentType = 'application/octet-stream';
        switch (file_ext) {
            case 'pdf':
                contentType = 'application/pdf';
            case 'jpg':
                contentType = '	image/jpg';
        }
        console.log(contentType);
        return this.s3
            .upload({
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Body: dataBuffer,
            Key: `${uuid_1.v4() + '.' + file_ext}`,
            ContentType: contentType,
        })
            .promise();
    }
    async delete(key) {
        return this.s3
            .deleteObject({
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Key: key,
        })
            .promise();
    }
};
S3ManagerService = __decorate([
    common_1.Injectable(),
    __param(0, nest_aws_sdk_1.InjectAwsService(aws_sdk_1.S3)),
    __metadata("design:paramtypes", [typeof (_a = typeof aws_sdk_1.S3 !== "undefined" && aws_sdk_1.S3) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], S3ManagerService);
exports.S3ManagerService = S3ManagerService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("00396f9ce2d8987b9e02")
/******/ })();
/******/ 
/******/ }
;