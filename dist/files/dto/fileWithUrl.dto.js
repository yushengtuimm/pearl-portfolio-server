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
exports.paginateResult = exports.fileDTO = exports.FileWithUrlDto = void 0;
const class_validator_1 = require("class-validator");
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
    __metadata("design:type", Date)
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
function paginateResult(result, docs) {
    return {
        docs: docs,
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
//# sourceMappingURL=fileWithUrl.dto.js.map