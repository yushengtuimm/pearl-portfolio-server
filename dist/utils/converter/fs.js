"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFile = exports.deleteFile = exports.getFileName = exports.fileExists = exports.folderExists = exports.exists = void 0;
const fs_1 = require("fs");
const exists = (path) => {
    return fs_1.existsSync(path);
};
exports.exists = exists;
const folderExists = (path) => {
    if (!exists(path)) {
        return false;
    }
    return fs_1.statSync(path).isDirectory();
};
exports.folderExists = folderExists;
const fileExists = (path) => {
    if (!exists(path)) {
        return false;
    }
    return fs_1.statSync(path).isFile();
};
exports.fileExists = fileExists;
const getFileName = (path) => {
    return path.split('/').pop();
};
exports.getFileName = getFileName;
const copyFile = (from, to) => {
    if (!fileExists(from)) {
        return false;
    }
    return fs_1.copyFileSync(from, to);
};
exports.copyFile = copyFile;
const deleteFile = (path) => {
    if (!fileExists(path)) {
        return false;
    }
    return fs_1.unlinkSync(path);
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=fs.js.map