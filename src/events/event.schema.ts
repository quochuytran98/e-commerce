// src/account/account.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Event extends Document {
  @Prop({ required: true, auto: true })
  id: number;

  @Prop({ required: true })
  organizationId: number;

  @Prop({ required: true })
  categoryId: number;

  @Prop({ required: true })
  eventName: string;

  @Prop({ default: 'PENDING' }) // Trạng thái ban đầu là PENDING
  state: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CONSIDERING'; //considering;

  @Prop({ required: false })
  description: string;

  @Prop()
  note: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  background: string;

  @Prop({ type: [Number], default: [] })
  showTimes: number[];

  @Prop({
    type: {
      fullName: { type: String },
      address: { type: String },
      phone: { type: String }
    },
    required: true
  })
  information: {
    fullName: string;
    address: string;
    phone: string;
    _id: false;
  };

  @Prop({
    type: {
      contentEmail: { type: String },
      url: { type: String },
      isPrivate: { type: Boolean },
      isSendMail: { type: Boolean }
    },
    required: false
  })
  setting: {
    contentEmail: string;
    url: string;
    isSendMail: boolean;
    isPrivate: boolean;
    _id: false;
  };

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
