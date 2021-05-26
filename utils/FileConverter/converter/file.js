import { fileExists } from './fs';
import path from 'path';

class File {
  constructor() {
    this.path = null;
  }

  setPath(path) {
    if (!path || path.constructor !== String) {
      throw new Error('File path should be a string');
    }

    if (!fileExists(path)) {
      throw new Error('File path doesnt exists');
    }

    this.path = path;
  }

  get info() {
    return path.parse(this.path);
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

export default File;
