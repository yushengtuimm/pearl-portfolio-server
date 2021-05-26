import path from "path";
import { platform } from "process";
import { Converter, getFileName } from "../converter";

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
    return "libreoffice --headless --convert-to pdf --outdir";
  }

  get converterForMac() {
    const sOfficeMac = "/Applications/LibreOffice.app/Contents/MacOS/soffice";
    return sOfficeMac + " --headless --convert-to pdf --outdir";
  }

  get converterForWindows() {
    return "soffice.exe --headless --convert-to pdf:writer_pdf_Export --outdir";
  }

  get execPath() {
    return (
      this.converter + ' "' + this.output + '" "' + this.oldFile.path + '"'
    );
  }

  getPdfFile(fileName) {
    return this.output + path.parse(fileName).name + ".pdf";
  }

  get pdf() {
    const fileName = getFileName(this.oldFile.path);
    return this.getPdfFile(fileName);
  }

  static create({ file, output, customConverter }) {
    const converter = new Ppt2PdfConverter();
    converter.setFile(file);
    converter.setOutput(output);
    converter.setConverter(customConverter);
    return converter;
  }
}

export default Ppt2PdfConverter;
