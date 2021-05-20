import { Test, TestingModule } from '@nestjs/testing';
import { FunctionResult } from 'src/utils/functionResult';
import { FilesController } from '../files.controller';
import { FilesService } from '../files.service';
import { files, fileInfos } from '../mocks/data';
import { File, FileWithUrl } from '../schemas/file.schema';

describe('FilesController', () => {
  let controller: FilesController;

  const mockFilesService = {
    uploadFiles: jest.fn().mockImplementation((files) => {
      const data = fileInfos.map((info) => info.filename);
      return Promise.resolve(
        files.map((file) => {
          if (!data.includes(file.originalname)) {
            const res: FunctionResult<File> = {
              success: true,
              result_objects: {
                fileId: '8046c2f0-77e7-43e5-b53d-fa1bc0b540d4',
                filename: file.originalname,
                file_type: file.originalname.split('.').pop(),
                updated: new Date(),
              },
            };
            return res;
          } else {
            const res: FunctionResult<File> = {
              success: false,
              details: {
                statusCode: 409,
                message: `file with name [${file.originalname}] already uploaded to the cloud storage.`,
                error: 'Conflict',
              },
            };
            return res;
          }
        }),
      );
    }),

    findAllWithType: jest.fn().mockImplementation((type) => {
      return Promise.resolve(
        fileInfos.map((info) => {
          if (info.file_type === type) {
            const res: FileWithUrl = {
              fileId: info.fileId,
              file_type: info.file_type,
              filename: info.filename,
              url: 'https://s3.amazonaws.com/',
            };
            return res;
          }
        }),
      );
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [{ provide: FilesService, useValue: mockFilesService }],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload the files and create a file doc', async () => {
    const res = await controller.upload(files);
    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          success: expect.any(Boolean),
        }),
      ]),
    );
    expect(res).toHaveLength(files.length);
    expect(res[0]).toEqual(
      expect.objectContaining({
        result_objects: expect.objectContaining({
          fileId: expect.any(String),
          filename: expect.any(String),
          file_type: expect.any(String),
          updated: expect.any(Date),
        }),
      }),
    );
    expect(res[1]).toEqual(
      expect.objectContaining({
        details: expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
          error: expect.any(String),
        }),
      }),
    );
    expect(mockFilesService.uploadFiles).toHaveBeenCalledWith(files);
  });

  it('should find all files with type of pdf', async () => {
    const res = await controller.findAll('pdf');
    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fileId: expect.any(String),
          filename: expect.any(String),
          file_type: expect.any(String),
          url: expect.any(String),
        }),
      ]),
    );
  });
});
