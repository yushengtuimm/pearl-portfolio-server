/// <reference types="node" />
declare class File {
    path: string;
    constructor();
    setPath(path: string): void;
    get info(): import("path").ParsedPath;
    get directory(): string;
    get extension(): string;
    get base(): string;
    get name(): string;
    static create({ filePath }: {
        filePath: any;
    }): File;
}
export default File;
