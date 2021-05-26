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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const s3_manager_service_1 = require("../s3-manager/s3-manager.service");
const files_repository_1 = require("./files.repository");
const fileWithUrl_dto_1 = require("./dto/fileWithUrl.dto");
const Ppt2PngConverter_1 = require("../utils/ppt2png/Ppt2PngConverter");
const path_1 = require("path");
const fs_1 = require("fs");
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
            const childs = [];
            if (extention == 'pptx' || extention == 'ppt') {
                const dir = path_1.join(__dirname, 'public');
                if (!fs_1.existsSync(dir))
                    fs_1.mkdirSync(dir);
                const tempFilePath = path_1.join(dir + '/' + filename);
                fs_1.writeFileSync(tempFilePath, buffer);
                const converter = Ppt2PngConverter_1.default.create({
                    file: tempFilePath,
                    output: dir + '/',
                });
                converter.convert();
                const tempFiles = fs_1.readdirSync(dir);
                const pngFiles = tempFiles.filter((file) => path_1.extname(file) === '.png');
                for (const pngName of pngFiles) {
                    const pngFile = path_1.join(dir, pngName);
                    const pngBuffer = fs_1.readFileSync(pngFile);
                    const pngUploadResult = await this.s3Manager.uploadFileToBucket(pngBuffer, 'png');
                    const pngFileInfo = await this.filesRepository.create({
                        fileId: pngUploadResult.Key,
                        filename: pngName,
                        file_type: 'png',
                    });
                    childs.push(pngFileInfo.fileId);
                }
                tempFiles.forEach((item) => {
                    fs_1.unlink(path_1.join(dir, item), (err) => {
                        if (err) {
                            return;
                        }
                    });
                });
            }
            const fileInfo = await this.filesRepository.create({
                fileId: uploadResult.Key,
                filename: filename,
                file_type: extention,
                childs: childs,
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
        if (doc) {
            if (doc.childs) {
                const res = [];
                for (const child of doc.childs) {
                    const info = await this.filesRepository.findOne({ fileId: child });
                    const url = await this.s3Manager.generatePresignedUrl(child);
                    res.push(fileWithUrl_dto_1.fileDTO(info, url));
                }
                return res;
            }
            else {
                const url = await this.s3Manager.generatePresignedUrl(doc.fileId);
                return fileWithUrl_dto_1.fileDTO(doc, url);
            }
        }
        throw new common_1.NotFoundException(`cannot find file with name [${doc.filename}] in cloud storage.`);
    }
    async remove(id) {
        const fileInfo = await this.filesRepository.findOne({ fileId: id });
        if (fileInfo) {
            await this.filesRepository.delete({
                fileId: { $in: fileInfo.childs },
            });
            fileInfo.childs.forEach(async (pngFile) => {
                await this.s3Manager.delete(pngFile);
            });
        }
        const s3Res = await this.s3Manager.delete(id);
        const res = await this.filesRepository.delete({ fileId: id });
    }
};
FilesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [files_repository_1.FilesRepository,
        s3_manager_service_1.S3ManagerService])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map