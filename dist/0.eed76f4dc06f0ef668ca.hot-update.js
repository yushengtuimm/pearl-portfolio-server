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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d6dceac4d096a9bb7a40")
/******/ })();
/******/ 
/******/ }
;