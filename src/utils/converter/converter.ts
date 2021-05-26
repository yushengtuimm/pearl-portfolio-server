import File from './file';
import { folderExists, fileExists, getFileName } from './fs';
import { execSync } from 'child_process';

type ConverterResult = {
  file: File;
  fileName: string;
  output: Buffer;
};

type ConverterParams = {
  file: string;
  output: string;
  customConverter?: string;
};

class Converter {
  oldFile: File;
  output: string;
  customConverter: string;

  constructor() {
    this.oldFile = null;
    this.output = null;
    this.customConverter = null;
  }

  get converter() {
    if (this.customConverter) return this.customConverter;
    return 'cp';
  }

  get newFile() {
    return this.output + this.oldFile.name + this.oldFile.extension;
  }

  get execPath() {
    return (
      this.converter + ' "' + this.oldFile.path + '" "' + this.newFile + '"'
    );
  }

  setConverter(converter: string) {
    if (!converter) return;
    this.customConverter = converter;
  }

  setFile(file: string) {
    if (!file) throw new Error('File path cannot be an empty string');

    this.oldFile = File.create({
      filePath: file,
    });
  }

  setOutput(output: string) {
    if (!output) throw new Error('Output cannot be an empty string');

    if (!folderExists(output)) throw new Error('Output folder doesnt exists');

    this.output = output;
  }

  convert(): ConverterResult {
    const fileName = getFileName(this.oldFile.path);
    const output = execSync(this.execPath);
    return {
      file: this.oldFile,
      fileName,
      output,
    };
  }

  static create({ file, output, customConverter }: ConverterParams) {
    const converter = new Converter();
    converter.setFile(file);
    converter.setOutput(output);
    converter.setConverter(customConverter);
    return converter;
  }
}

export default Converter;
export {
  Converter,
  File,
  folderExists,
  fileExists,
  getFileName,
  ConverterResult,
  ConverterParams,
};
