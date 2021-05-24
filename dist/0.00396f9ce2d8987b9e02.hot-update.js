exports.id = 0;
exports.ids = null;
exports.modules = {

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
        const newFileInfos = fileWithUrl_dto_1.paginateResult(fileInfos, newDocs);
        return newFileInfos;
    }
    async findOne(fileId) {
        const doc = await this.filesRepository.findOne({ fileId });
        if (doc) {
            return this.s3Manager.getFileFromBucket(doc.fileId);
        }
        throw new common_1.NotFoundException(`cannot find file with name [${doc.filename}] in cloud storage.`);
    }
    async findFile(filename) {
        const doc = await this.filesRepository.findOne({ filename });
        console.log(doc);
        if (doc) {
            const url = await this.s3Manager.generatePresignedUrl(doc.fileId);
            return fileWithUrl_dto_1.fileDTO(doc, url);
        }
        throw new common_1.NotFoundException(`cannot find file with name [${doc.filename}] in cloud storage.`);
    }
    async remove(id) {
        const s3Res = await this.s3Manager.delete(id);
        const res = await this.filesRepository.delete({ fileId: id });
    }
};
FilesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof files_repository_1.FilesRepository !== "undefined" && files_repository_1.FilesRepository) === "function" ? _a : Object, typeof (_b = typeof s3_manager_service_1.S3ManagerService !== "undefined" && s3_manager_service_1.S3ManagerService) === "function" ? _b : Object])
], FilesService);
exports.FilesService = FilesService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7ed98406971d117d59d7")
/******/ })();
/******/ 
/******/ }
;