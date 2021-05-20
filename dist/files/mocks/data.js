"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileInfos = exports.files = void 0;
const stream_1 = require("stream");
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
exports.fileInfos = [
    {
        fileId: '8046c2f0-77e7-43e5-b53d-fa1bc0b540d4',
        filename: 'mock1.pdf',
        file_type: 'pdf',
        updated: new Date(),
    },
    {
        fileId: '06d7fe4b-2f6a-4956-91c7-6dcd0377a054',
        filename: 'mock2.pdf',
        file_type: 'pdf',
        updated: new Date(),
    },
];
//# sourceMappingURL=data.js.map