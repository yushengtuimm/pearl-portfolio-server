"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf2PngConverter_1 = require("../pdf2png/pdf2PngConverter");
const ppt2PdfConverter_1 = require("../ppt2pdf/ppt2PdfConverter");
const converter_1 = require("../converter/converter");
class Ppt2PngConverter extends converter_1.Converter {
    constructor() {
        super();
    }
    convert() {
        const pptConverter = ppt2PdfConverter_1.default.create({
            file: this.oldFile.path,
            output: this.output,
        });
        pptConverter.convert();
        const pdfConverter = pdf2PngConverter_1.Pdf2PngConverter.create({
            file: pptConverter.pdf,
            output: this.output,
        });
        return pdfConverter.convert();
    }
    static create({ file, output }) {
        const converter = new Ppt2PngConverter();
        converter.setFile(file);
        converter.setOutput(output);
        return converter;
    }
}
exports.default = Ppt2PngConverter;
//# sourceMappingURL=Ppt2PngConverter.js.map