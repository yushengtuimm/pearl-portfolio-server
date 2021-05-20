import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type FileDocument = File & Document;

type BaseUrl = {
  url: string;
};

export type FileWithUrl = File & BaseUrl;

@Schema()
export class File {
  @Prop({ type: String, required: true, default: uuidv4() })
  fileId: string;

  @Prop({ type: String, required: true })
  file_type: string;

  @Prop({ type: String, required: true })
  filename: string;

  @Prop({ type: Date, default: Date.now })
  updated?: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
