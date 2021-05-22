"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const files_service_1 = require("./files.service");
const files_controller_1 = require("./files.controller");
const s3_manager_module_1 = require("../s3-manager/s3-manager.module");
const file_schema_1 = require("./schemas/file.schema");
const files_repository_1 = require("./files.repository");
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
                        schema.plugin(require('mongoose-paginate-v2'));
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
//# sourceMappingURL=files.module.js.map