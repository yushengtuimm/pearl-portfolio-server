"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMockFiles = exports.fileToBuffer = exports.mockFile = exports.mockReadStream = exports.mockBuffer = void 0;
const fs_1 = require("fs");
const stream_1 = require("stream");
exports.mockBuffer = jest.fn().mockImplementation(() => {
    return Buffer.from('This is sample Test Data', 'utf8');
});
exports.mockReadStream = jest.fn().mockImplementation(() => {
    const readable = new stream_1.Readable();
    readable.push(exports.mockBuffer);
    return readable;
});
exports.mockFile = jest.fn().mockImplementation(() => {
    return {
        buffer: exports.mockBuffer,
        fieldname: 'files',
        originalname: 'mock.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        destination: '',
        filename: '',
        path: '',
        size: 328092,
        stream: exports.mockReadStream,
    };
});
const fileToBuffer = (filename) => {
    const readStream = fs_1.default.createReadStream(filename);
    const chunks = [];
    return new Promise((resolve, reject) => {
        readStream.on('error', (err) => {
            reject(err);
        });
        readStream.on('data', (chunk) => {
            chunks.push(chunks);
        });
        readStream.on('close', () => {
            resolve(Buffer.concat(chunks));
        });
    });
};
exports.fileToBuffer = fileToBuffer;
const generateMockFiles = async () => {
    const files = [];
    const mockStream = new stream_1.Readable();
    const buffer = (await exports.fileToBuffer('mock.pdf'));
    mockStream.push(buffer);
    files.push({
        buffer: buffer,
        fieldname: 'files',
        originalname: 'mock.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        destination: '',
        filename: '',
        path: '',
        size: 328092,
        stream: mockStream,
    });
    return files;
};
exports.generateMockFiles = generateMockFiles;
//# sourceMappingURL=genereateMockFiles.js.map