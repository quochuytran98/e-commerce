// src/account/categories.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false }) 
export class Category extends Document {
  @Prop({ required: true, auto: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  icon: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
