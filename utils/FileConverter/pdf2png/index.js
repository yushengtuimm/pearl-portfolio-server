import { platform } from "process";
import { Converter } from "../converter";
import Options from "./options";

class Pdf2PngConverter extends Converter {
  constructor() {
    super();
    this.convertString = "";
  }

  get converter() {
    const converters = {
      darwin: this.converterForMac,
      win32: this.converterForWindows,
      default: this.converterForLinux,
    };

    if (this.customConverter) return this.customConverter;

    if (converters[platform]) return converters[platform];

    return converters.default;
  }

  get converterForLinux() {
    return `convert ${this.convertString} -colorspace RGB`;
  }

  get converterForMac() {
    return `convert ${this.convertString} -colorspace RGB`;
  }

  get converterForWindows() {
    return `magick.exe ${this.convertString} -colorspace RGB`;
  }

  get newFile() {
    return this.output + this.oldFile.name + ".png";
  }

  setConvertString(convertString) {
    if (!convertString) return;

    if (convertString.constructor !== String)
      throw new Error("The convert string should be a string");

    this.convertString = convertString;
  }

  static create({ file, output, customConverter, density, quality }) {
    const converter = new Pdf2PngConverter();
    converter.setFile(file);
    converter.setOutput(output);
    converter.setConverter(customConverter);
    converter.setConvertString(
      Options.create({
        density,
        quality,
      }).convertString
    );

    return converter;
  }
}

export default Pdf2PngConverter;
