import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { S3ManagerService } from '../../s3-manager/s3-manager.service';
import { FilesService } from '../files.service';
import { File } from '../schemas/file.schema';
import { FilesRepository } from '../files.repository';

describe('FilesService', () => {
  let service: FilesService;

  const mockFilesRepository = {
    uploadFiles: jest.fn().mockImplementation((files) => {}),
  };

  const mockS3ManagerService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        { provide: FilesRepository, useValue: mockFilesRepository },
        {
          provide: S3ManagerService,
          useValue: mockS3ManagerService,
        },
      ],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
