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
exports.FileSchema = exports.File = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
let File = class File {
};
__decorate([
    mongoose_1.Prop({ type: String, required: true, default: uuid_1.v4() }),
    __metadata("design:type", String)
], File.prototype, "fileId", void 0);
__decorate([
    mongoose_1.Prop({ type: String, required: true }),
    __metadata("design:type", String)
], File.prototype, "file_type", void 0);
__decorate([
    mongoose_1.Prop({ type: String, required: true }),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    mongoose_1.Prop({ type: [String] }),
    __metadata("design:type", Array)
], File.prototype, "childs", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], File.prototype, "updated", void 0);
File = __decorate([
    mongoose_1.Schema()
], File);
exports.File = File;
exports.FileSchema = mongoose_1.SchemaFactory.createForClass(File);
//# sourceMappingURL=file.schema.js.map