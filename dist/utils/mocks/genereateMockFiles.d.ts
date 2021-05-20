/// <reference types="jest" />
/// <reference types="multer" />
export declare const mockBuffer: jest.Mock<any, any>;
export declare const mockReadStream: jest.Mock<any, any>;
export declare const mockFile: jest.Mock<any, any>;
export declare const fileToBuffer: (filename: any) => Promise<unknown>;
export declare const generateMockFiles: () => Promise<Express.Multer.File[]>;
