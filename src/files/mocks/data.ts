import { FunctionResult } from '../../utils/functionResult';
import { Readable } from 'stream';
import { File } from '../schemas/file.schema';

export const fileInfos: File[] = [
  {
    fileId: '06d7fe4b-2f6a-4956-91c7-6dcd0377a054',
    filename: 'mock2.pdf',
    file_type: 'pdf',
    updated: new Date(),
  },
];

export const files: Express.Multer.File[] = [
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
    stream: new Readable(),
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
    stream: new Readable(),
  },
];
