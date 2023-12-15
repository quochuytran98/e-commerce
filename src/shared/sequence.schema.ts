// src/account/sequence.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Sequence extends Document {
  @Prop({ required: true })
  modelName: string;

  @Prop({ required: true })
  value: number;
}

export const SequenceSchema = SchemaFactory.createForClass(Sequence);
