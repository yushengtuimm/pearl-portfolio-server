import { Converter, ConverterParams } from '../converter/converter';
declare type Pdf2PngConverterParams = ConverterParams & {
    density?: number;
    quality?: number;
};
declare class Pdf2PngConverter extends Converter {
    convertString: string;
    constructor();
    get converter(): any;
    get converterForLinux(): string;
    get converterForMac(): string;
    get converterForWindows(): string;
    get newFile(): string;
    setConvertString(convertString: string): void;
    static create({ file, output, customConverter, density, quality, }: Pdf2PngConverterParams): Pdf2PngConverter;
}
export default Pdf2PngConverter;
export { Pdf2PngConverter, Pdf2PngConverterParams };
