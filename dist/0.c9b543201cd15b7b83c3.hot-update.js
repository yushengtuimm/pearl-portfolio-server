exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 11:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesModule = void 0;
const common_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(12);
const files_service_1 = __webpack_require__(13);
const files_controller_1 = __webpack_require__(19);
const s3_manager_module_1 = __webpack_require__(22);
const file_schema_1 = __webpack_require__(18);
const files_repository_1 = __webpack_require__(17);
let FilesModule = class FilesModule {
};
FilesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: file_schema_1.File.name,
                    useFactory: () => {
                        const schema = file_schema_1.FileSchema;
                        schema.plugin(__webpack_require__(23));
                        return schema;
                    },
                },
            ]),
            s3_manager_module_1.S3ManagerModule,
        ],
        controllers: [files_controller_1.FilesController],
        providers: [files_service_1.FilesService, files_repository_1.FilesRepository],
    })
], FilesModule);
exports.FilesModule = FilesModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4d1663c8b4037dd9686c")
/******/ })();
/******/ 
/******/ }
;