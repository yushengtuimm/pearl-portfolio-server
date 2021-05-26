import Pdf2PngConverter from '../pdf2png';
import PptToPdfConverter from '../ppt2pdf';
import { File, Converter } from '../converter';

class Ppt2PngConverter extends Converter {
  constructor() {
    super();
    this.files = [];
  }

  setFiles(files) {
    if (!files || files.constructor !== Array)
      throw new Error('Files should be a array');

    this.files = files.map((file) =>
      File.create({
        filePath: file,
      }),
    );
  }

  convert() {
    return this.files.map((file) => {
      const pptConverter = PptToPdfConverter.create({
        file: file.path,
        output: this.output,
      });
      pptConverter.convert();

      const pdfConverter = Pdf2PngConverter.create({
        file: pptConverter.pdf,
        output: this.output,
      });

      return pdfConverter.convert();
    });
  }

  static create({ files, output }) {
    const converter = new Ppt2PngConverter();

    converter.setFiles(files);
    converter.setOutput(output);

    return converter;
  }
}

export default Ppt2PngConverter;
