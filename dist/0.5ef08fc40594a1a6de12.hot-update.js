exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 19:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginateResult = exports.fileDTO = exports.FileWithUrlDto = void 0;
const class_validator_1 = __webpack_require__(20);
class FileWithUrlDto {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], FileWithUrlDto.prototype, "fileId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], FileWithUrlDto.prototype, "file_type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], FileWithUrlDto.prototype, "filename", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FileWithUrlDto.prototype, "updated", void 0);
__decorate([
    class_validator_1.IsUrl(),
    __metadata("design:type", String)
], FileWithUrlDto.prototype, "url", void 0);
exports.FileWithUrlDto = FileWithUrlDto;
function fileDTO(file, url) {
    return {
        fileId: file.fileId,
        file_type: file.file_type,
        filename: file.filename,
        updated: file.updated,
        url: url,
    };
}
exports.fileDTO = fileDTO;
function paginateResult(result) {
    return {
        docs: [],
        totalDocs: result.totalDocs,
        offset: result.offset,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page,
        pagingCounter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
    };
}
exports.paginateResult = paginateResult;


/***/ }),

/***/ 13:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesService = void 0;
const common_1 = __webpack_require__(5);
const s3_manager_service_1 = __webpack_require__(14);
const files_repository_1 = __webpack_require__(17);
const fileWithUrl_dto_1 = __webpack_require__(19);
let FilesService = class FilesService {
    constructor(filesRepository, s3Manager) {
        this.filesRepository = filesRepository;
        this.s3Manager = s3Manager;
    }
    async uploadFiles(files) {
        return Promise.all(files.map(async (file) => {
            const buffer = file.buffer;
            const filename = file.originalname;
            const exist = await this.filesRepository.exist({ filename: filename });
            if (exist) {
                return {
                    success: false,
                    details: new common_1.ConflictException(`file with name [${filename}] already uploaded to the cloud storage.`).getResponse(),
                };
            }
            const extention = filename.split('.').pop();
            const uploadResult = await this.s3Manager.uploadFileToBucket(buffer, extention);
            const fileInfo = await this.filesRepository.create({
                fileId: uploadResult.Key,
                filename: filename,
                file_type: extention,
            });
            return {
                success: true,
                result_object: fileInfo,
            };
        }));
    }
    async findAll(type, offset, limit) {
        let query = {};
        if (type)
            query.file_type = type;
        let option = {
            offset: offset,
            limit: limit,
        };
        const fileInfos = await this.filesRepository.find(query, option);
        const newDocs = [];
        for (const doc of fileInfos.docs) {
            const url = await this.s3Manager.generatePresignedUrl(doc.fileId);
            newDocs.push(fileWithUrl_dto_1.fileDTO(doc, url));
        }
        const newFileInfos = fileWithUrl_dto_1.paginateResult(fileInfos);
        newFileInfos.docs = newDocs;
        return newFileInfos;
    }
    async findOne(fileId) {
        const fileInfo = await this.filesRepository.findOne({ fileId });
        if (fileInfo) {
            return this.s3Manager.getFileFromBucket(fileInfo.fileId);
        }
        throw new common_1.NotFoundException(`cannot find file with name [${fileInfo.filename}] in cloud storage.`);
    }
    remove(id) {
        return `This action removes a #${id} file`;
    }
};
FilesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof files_repository_1.FilesRepository !== "undefined" && files_repository_1.FilesRepository) === "function" ? _a : Object, typeof (_b = typeof s3_manager_service_1.S3ManagerService !== "undefined" && s3_manager_service_1.S3ManagerService) === "function" ? _b : Object])
], FilesService);
exports.FilesService = FilesService;


/***/ }),

/***/ 20:
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");;

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0b479ee7dda6cc899a70")
/******/ })();
/******/ 
/******/ }
;