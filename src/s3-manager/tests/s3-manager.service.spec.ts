import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { S3ManagerService } from '../s3-manager.service';
import {
  createAwsServiceMock,
  createAwsServicePromisableSpy,
  getAwsServiceMock,
} from 'nest-aws-sdk/dist/testing';
import { S3 } from 'aws-sdk';

describe('S3ManagerService', () => {
  let service: S3ManagerService;
  let module: TestingModule;

  const mockConfigService = {};

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        S3ManagerService,
        createAwsServiceMock(S3, {
          useValue: {
            listObjectsV2: () => null,
          },
        }),
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<S3ManagerService>(S3ManagerService);
  });

  describe('listBucketContents', () => {
    it('should call the list method and return the Content keys', async () => {
      const listSpy = createAwsServicePromisableSpy(
        getAwsServiceMock(module, S3),
        'listObjectsV2',
        'resolve',
        {
          Contents: [{ Key: 'myKey' }],
        },
      );
      const res = await service.listBucketContents('myBucket');
      expect(res.length).toBe(1);
      expect(res[0]).toBe('myKey');
      expect(listSpy).toHaveBeenCalledTimes(1);
      expect(listSpy).toHaveBeenCalledWith({ Bucket: 'myBucket' });
    });
  });
});
