import { parse } from 'path';
import { platform } from 'process';
import {
  Converter,
  getFileName,
  ConverterParams,
} from '../converter/converter';

class Ppt2PdfConverter extends Converter {
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
    return 'soffice --headless --convert-to pdf --outdir';
  } //libreoffice

  get converterForMac() {
    const sOfficeMac = '/Applications/LibreOffice.app/Contents/MacOS/soffice';
    return sOfficeMac + ' --headless --convert-to pdf --outdir';
  }

  get converterForWindows() {
    return 'soffice.exe --headless --convert-to pdf:writer_pdf_Export --outdir';
  }

  get execPath() {
    return (
      this.converter + ' "' + this.output + '" "' + this.oldFile.path + '"'
    );
  }

  getPdfFile(fileName: string) {
    return this.output + parse(fileName).name + '.pdf';
  }

  get pdf() {
    const fileName = getFileName(this.oldFile.path);
    return this.getPdfFile(fileName);
  }

  static create({ file, output, customConverter }: ConverterParams) {
    const converter = new Ppt2PdfConverter();
    converter.setFile(file);
    converter.setOutput(output);
    converter.setConverter(customConverter);
    return converter;
  }
}

export default Ppt2PdfConverter;
