import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { S3ManagerService } from '../../s3-manager/s3-manager.service';
import { FilesService } from '../files.service';
import { File } from '../schemas/file.schema';
import { FilesRepository } from '../files.repository';

describe('FilesRepository', () => {
  let repository: FilesRepository;

  const mockFileModel = {
    create: jest
      .fn()
      .mockImplementation((file) =>
        Promise.resolve({ _id: 'MongooseUniqueIdField', ...file }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesRepository,
        { provide: getModelToken(File.name), useValue: mockFileModel },
      ],
    }).compile();

    repository = module.get<FilesRepository>(FilesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a new file record and return it', async () => {
    const file: File = {
      fileId: '06d7fe4b-2f6a-4956-91c7-6dcd0377a054',
      filename: 'mock2.pdf',
      file_type: 'pdf',
      updated: new Date(),
    };
    const res = await repository.create(file);
    expect(res).toEqual({
      _id: expect.any(String),
      fileId: expect.any(String),
      filename: file.filename,
      file_type: expect.any(String),
      updated: expect.any(Date),
    });
  });
});
