import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class ShowTime extends Document {
  @Prop({ required: true, auto: true })
  id: number;

  @Prop({ required: true })
  accountId: number;

  @Prop({ required: true, type: Date })
  dateTime: Date;

  @Prop({ required: true })
  eventId: number; // Liên kết với ID của sự kiện

  @Prop({ required: true })
  location: string;

  @Prop({ type: [{ name: String, price: Number, quantity: Number, seatsPerRow: Number, note: String, color: String }] })
  ticketTypes: {
    name: string;
    price: number;
    quantity: number;
    seatsPerRow: number;
    note: string;
    color: string;
  }[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ShowTimeSchema = SchemaFactory.createForClass(ShowTime);
