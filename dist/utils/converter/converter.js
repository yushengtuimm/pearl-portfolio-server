"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = exports.fileExists = exports.folderExists = exports.File = exports.Converter = void 0;
const file_1 = require("./file");
exports.File = file_1.default;
const fs_1 = require("./fs");
Object.defineProperty(exports, "folderExists", { enumerable: true, get: function () { return fs_1.folderExists; } });
Object.defineProperty(exports, "fileExists", { enumerable: true, get: function () { return fs_1.fileExists; } });
Object.defineProperty(exports, "getFileName", { enumerable: true, get: function () { return fs_1.getFileName; } });
const child_process_1 = require("child_process");
class Converter {
    constructor() {
        this.oldFile = null;
        this.output = null;
        this.customConverter = null;
    }
    get converter() {
        if (this.customConverter)
            return this.customConverter;
        return 'cp';
    }
    get newFile() {
        return this.output + this.oldFile.name + this.oldFile.extension;
    }
    get execPath() {
        return (this.converter + ' "' + this.oldFile.path + '" "' + this.newFile + '"');
    }
    setConverter(converter) {
        if (!converter)
            return;
        this.customConverter = converter;
    }
    setFile(file) {
        if (!file)
            throw new Error('File path cannot be an empty string');
        this.oldFile = file_1.default.create({
            filePath: file,
        });
    }
    setOutput(output) {
        if (!output)
            throw new Error('Output cannot be an empty string');
        if (!fs_1.folderExists(output))
            throw new Error('Output folder doesnt exists');
        this.output = output;
    }
    convert() {
        const fileName = fs_1.getFileName(this.oldFile.path);
        const output = child_process_1.execSync(this.execPath);
        return {
            file: this.oldFile,
            fileName,
            output,
        };
    }
    static create({ file, output, customConverter }) {
        const converter = new Converter();
        converter.setFile(file);
        converter.setOutput(output);
        converter.setConverter(customConverter);
        return converter;
    }
}
exports.Converter = Converter;
exports.default = Converter;
//# sourceMappingURL=converter.js.map