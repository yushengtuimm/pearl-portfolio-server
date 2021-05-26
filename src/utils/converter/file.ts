import { fileExists } from './fs';
import { parse } from 'path';

class File {
  path: string;

  constructor() {
    this.path = null;
  }

  setPath(path: string) {
    if (!path) throw new Error('File path cannot be an empty string');

    if (!fileExists(path)) throw new Error('File path doesnt exists');

    this.path = path;
  }

  get info() {
    return parse(this.path);
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
