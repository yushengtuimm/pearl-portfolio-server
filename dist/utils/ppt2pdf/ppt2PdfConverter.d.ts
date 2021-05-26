import { Converter, ConverterParams } from '../converter/converter';
declare class Ppt2PdfConverter extends Converter {
    get converter(): any;
    get converterForLinux(): string;
    get converterForMac(): string;
    get converterForWindows(): string;
    get execPath(): string;
    getPdfFile(fileName: string): string;
    get pdf(): string;
    static create({ file, output, customConverter }: ConverterParams): Ppt2PdfConverter;
}
export default Ppt2PdfConverter;
