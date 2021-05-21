import { IsString, IsDate, IsUrl } from 'class-validator';

export class FileWithUrlDto {
  @IsString()
  fileId: string;

  @IsString()
  file_type: string;

  @IsString()
  filename: string;

  @IsDate()
  updated: Date;

  @IsUrl()
  url: string;
}
