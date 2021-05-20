"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.files = exports.fileInfos = void 0;
const stream_1 = require("stream");
exports.fileInfos = [
    {
        fileId: '06d7fe4b-2f6a-4956-91c7-6dcd0377a054',
        filename: 'mock2.pdf',
        file_type: 'pdf',
        updated: new Date(),
    },
];
exports.files = [
    {
        buffer: Buffer.from('Test Data01', 'utf8'),
        fieldname: 'files',
        originalname: 'mock1.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        destination: '',
        filename: '',
        path: '',
        size: 12345,
        stream: new stream_1.Readable(),
    },
    {
        buffer: Buffer.from('Test Data02', 'utf8'),
        fieldname: 'files',
        originalname: 'mock2.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        destination: '',
        filename: '',
        path: '',
        size: 54321,
        stream: new stream_1.Readable(),
    },
];
//# sourceMappingURL=data.js.map