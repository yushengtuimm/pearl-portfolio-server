exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 17:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesRepository = void 0;
const common_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(12);
const file_schema_1 = __webpack_require__(18);
let FilesRepository = class FilesRepository {
    constructor(fileModel) {
        this.fileModel = fileModel;
    }
    async exist(fileFilterQuery) {
        const result = await this.fileModel.countDocuments(fileFilterQuery);
        if (result > 0)
            return true;
        else
            return false;
    }
    async findOne(fileFilterQuery) {
        return this.fileModel.findOne(fileFilterQuery);
    }
    async find(fileFilterQuery, paginateOptions) {
        return this.fileModel.paginate(fileFilterQuery, paginateOptions);
    }
    async create(file) {
        const newFile = file;
        return this.fileModel.create(newFile);
    }
    async findOneAndUpdate(fileFilterQuery, file) {
        return this.fileModel.findOneAndUpdate(fileFilterQuery, file);
    }
    async delete(fileFilterQuery) {
        return this.fileModel.deleteOne(fileFilterQuery);
    }
};
FilesRepository = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(file_schema_1.File.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof file_schema_1.FileModel !== "undefined" && file_schema_1.FileModel) === "function" ? _a : Object])
], FilesRepository);
exports.FilesRepository = FilesRepository;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d771dcb6953e11802e92")
/******/ })();
/******/ 
/******/ }
;