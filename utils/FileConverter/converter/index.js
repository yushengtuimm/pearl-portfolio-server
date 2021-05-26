import File from "./file";
import { folderExists, fileExists, getFileName } from "./fs";
import { execSync } from "child_process";

class Converter {
  constructor() {
    this.oldFile = null;
    this.output = null;
    this.customConverter = null;
  }

  get converter() {
    if (this.customConverter) return this.customConverter;

    return "cp";
  }

  setConverter(converter) {
    if (!converter) return;

    if (converter.constructor !== String)
      throw new Error("Converter should be a string");

    this.customConverter = converter;
  }

  setFile(file) {
    if (!file || file.constructor !== String)
      throw new Error("File should be a string");

    this.oldFile = File.create({
      filePath: file,
    });
  }

  setOutput(output) {
    if (!output || output.constructor !== String)
      throw new Error("Output should be a string");

    if (!folderExists(output)) throw new Error("Output folder doesnt exists");

    this.output = output;
  }

  get newFile() {
    return this.output + this.oldFile.name + this.oldFile.extension;
  }

  get execPath() {
    return (
      this.converter + ' "' + this.oldFile.path + '" "' + this.newFile + '"'
    );
  }

  convert() {
    const fileName = getFileName(this.oldFile.path);
    const output = execSync(this.execPath);
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

export default Converter;
export { Converter, File, folderExists, fileExists, getFileName };
