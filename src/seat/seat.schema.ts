import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Seat extends Document {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true, default: null })
  eventId: number;

  @Prop({ required: true, default: null })
  showTimeId: number;

  @Prop({ required: false, default: null })
  accountId: number;

  @Prop({ required: true })
  ticketTypeId: string;

  @Prop({ required: true })
  seatNumber: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: false })
  note: string;

  @Prop({ required: false })
  name: string;

  @Prop({ default: 'AVAILABLE' }) // Trạng thái ban đầu là AVAILABLE
  state: 'AVAILABLE' | 'BOOKED' | 'SOLD';

  @Prop({ type: Date, default: null })
  bookedAt: Date;

  @Prop({ type: Date, default: null })
  soldAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
