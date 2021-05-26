import { Converter, ConverterParams, ConverterResult } from '../converter/converter';
declare class Ppt2PngConverter extends Converter {
    constructor();
    convert(): ConverterResult;
    static create({ file, output }: ConverterParams): Ppt2PngConverter;
}
export default Ppt2PngConverter;
