import fs from 'fs';
import { Readable } from 'stream';

export const mockBuffer = jest.fn().mockImplementation(() => {
  return Buffer.from('This is sample Test Data', 'utf8');
});

export const mockReadStream = jest.fn().mockImplementation(() => {
  const readable = new Readable();
  readable.push(mockBuffer);
  return readable;
});

export const mockFile = jest.fn().mockImplementation(() => {
  return {
    buffer: mockBuffer,
    fieldname: 'files',
    originalname: 'mock.pdf',
    encoding: '7bit',
    mimetype: 'application/pdf',
    destination: '',
    filename: '',
    path: '',
    size: 328092,
    stream: mockReadStream,
  };
});

export const fileToBuffer = (filename) => {
  const readStream = fs.createReadStream(filename);
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

export const generateMockFiles = async () => {
  const files: Express.Multer.File[] = [];
  const mockStream = new Readable();
  //   const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
  //     frequency: 10, // in milliseconds.
  //     chunkSize: 2048, // in bytes.
  //   });
  const buffer = (await fileToBuffer('mock.pdf')) as Buffer;
  mockStream.push(buffer);
  //   myReadableStreamBuffer.put(buffer as Buffer);
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
