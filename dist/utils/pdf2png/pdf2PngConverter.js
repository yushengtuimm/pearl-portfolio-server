"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pdf2PngConverter = void 0;
const process_1 = require("process");
const converter_1 = require("../converter/converter");
const options_1 = require("./options");
class Pdf2PngConverter extends converter_1.Converter {
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
        if (this.customConverter)
            return this.customConverter;
        if (converters[process_1.platform])
            return converters[process_1.platform];
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
    setConvertString(convertString) {
        if (!convertString)
            return;
        this.convertString = convertString;
    }
    static create({ file, output, customConverter, density, quality, }) {
        const converter = new Pdf2PngConverter();
        converter.setFile(file);
        converter.setOutput(output);
        converter.setConverter(customConverter);
        converter.setConvertString(options_1.default.create({
            density,
            quality,
        }).convertString);
        return converter;
    }
}
exports.Pdf2PngConverter = Pdf2PngConverter;
exports.default = Pdf2PngConverter;
//# sourceMappingURL=pdf2PngConverter.js.map