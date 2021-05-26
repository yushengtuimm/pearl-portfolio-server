"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("./fs");
const path_1 = require("path");
class File {
    constructor() {
        this.path = null;
    }
    setPath(path) {
        if (!path)
            throw new Error('File path cannot be an empty string');
        if (!fs_1.fileExists(path))
            throw new Error('File path doesnt exists');
        this.path = path;
    }
    get info() {
        return path_1.parse(this.path);
    }
    get directory() {
        return this.info.dir;
    }
    get extension() {
        return this.info.ext;
    }
    get base() {
        return this.info.base;
    }
    get name() {
        return this.info.name;
    }
    static create({ filePath }) {
        const file = new File();
        file.setPath(filePath);
        return file;
    }
}
exports.default = File;
//# sourceMappingURL=file.js.map