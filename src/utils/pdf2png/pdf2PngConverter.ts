import { platform } from 'process';
import { Converter, ConverterParams } from '../converter/converter';
import Options from './options';

type Pdf2PngConverterParams = ConverterParams & {
  density?: number;
  quality?: number;
};

class Pdf2PngConverter extends Converter {
  convertString: string;

  constructor() {
    super();
    this.convertString = '';
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
    return this.output + this.oldFile.name + '.png';
  }

  setConvertString(convertString: string) {
    if (!convertString) return;

    this.convertString = convertString;
  }

  static create({
    file,
    output,
    customConverter,
    density,
    quality,
  }: Pdf2PngConverterParams) {
    const converter = new Pdf2PngConverter();
    converter.setFile(file);
    converter.setOutput(output);
    converter.setConverter(customConverter);
    converter.setConvertString(
      Options.create({
        density,
        quality,
      }).convertString,
    );

    return converter;
  }
}

export default Pdf2PngConverter;
export { Pdf2PngConverter, Pdf2PngConverterParams };
