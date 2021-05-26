import { Pdf2PngConverter } from '../pdf2png/pdf2PngConverter';
import Ppt2PdfConverter from '../ppt2pdf/ppt2PdfConverter';
import {
  File,
  Converter,
  ConverterParams,
  ConverterResult,
} from '../converter/converter';

class Ppt2PngConverter extends Converter {
  constructor() {
    super();
  }

  convert(): ConverterResult {
    const pptConverter = Ppt2PdfConverter.create({
      file: this.oldFile.path,
      output: this.output,
    });
    pptConverter.convert();

    const pdfConverter = Pdf2PngConverter.create({
      file: pptConverter.pdf,
      output: this.output,
    });

    return pdfConverter.convert();
  }

  static create({ file, output }: ConverterParams) {
    const converter = new Ppt2PngConverter();
    converter.setFile(file);
    converter.setOutput(output);
    return converter;
  }
}

export default Ppt2PngConverter;
