"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const converter_1 = require("../converter/converter");
class Ppt2PdfConverter extends converter_1.Converter {
    get converter() {
        const converters = {
            darwin: this.converterForMac,
            win32: this.converterForWindows,
            default: this.converterForLinux,
        };
        if (this.customConverter)
            return this.customConverter;
        if (converters[process_1.platform])
            return converters[process_1.platform];
        return converters.default;
    }
    get converterForLinux() {
        return 'soffice --headless --convert-to pdf --outdir';
    }
    get converterForMac() {
        const sOfficeMac = '/Applications/LibreOffice.app/Contents/MacOS/soffice';
        return sOfficeMac + ' --headless --convert-to pdf --outdir';
    }
    get converterForWindows() {
        return 'soffice.exe --headless --convert-to pdf:writer_pdf_Export --outdir';
    }
    get execPath() {
        return (this.converter + ' "' + this.output + '" "' + this.oldFile.path + '"');
    }
    getPdfFile(fileName) {
        return this.output + path_1.parse(fileName).name + '.pdf';
    }
    get pdf() {
        const fileName = converter_1.getFileName(this.oldFile.path);
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
exports.default = Ppt2PdfConverter;
//# sourceMappingURL=ppt2PdfConverter.js.map