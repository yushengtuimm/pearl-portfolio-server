/// <reference types="node" />
import File from './file';
import { folderExists, fileExists, getFileName } from './fs';
declare type ConverterResult = {
    file: File;
    fileName: string;
    output: Buffer;
};
declare type ConverterParams = {
    file: string;
    output: string;
    customConverter?: string;
};
declare class Converter {
    oldFile: File;
    output: string;
    customConverter: string;
    constructor();
    get converter(): string;
    get newFile(): string;
    get execPath(): string;
    setConverter(converter: string): void;
    setFile(file: string): void;
    setOutput(output: string): void;
    convert(): ConverterResult;
    static create({ file, output, customConverter }: ConverterParams): Converter;
}
export default Converter;
export { Converter, File, folderExists, fileExists, getFileName, ConverterResult, ConverterParams, };
