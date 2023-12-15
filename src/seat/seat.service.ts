// seat.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seat } from './seat.schema';
import { TicketTypes } from '../show-time/interfaces/showTime.interface';

import { SequenceService } from '../shared/sequence.service';
@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat.name) private readonly seatModel: Model<Seat>,
    private readonly sequenceService: SequenceService
  ) {}

  async createSeats(showTimeId: number, ticketTypes: TicketTypes[], eventId: number): Promise<void> {
    try {
      const seatsToCreate = [];

      for (const ticketType of ticketTypes) {
        const { name, price, quantity, seatsPerRow, note, _id } = ticketType;

        const seatIds: number[] = await this.sequenceService.getMultipleNextId(Seat.name, quantity);
        let seatIndex = 0;
        for (let row = 1; row <= quantity / seatsPerRow; row++) {
          for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
            const seatId = seatIds[seatIndex];
            const seat = {
              id: seatId,
              eventId,
              showTimeId,
              price,
              note,
              ticketTypeId: _id,
              seatNumber: `${name}-${row}-${seatNumber}`,
              status: 'AVAILABLE',
              createdAt: new Date(),
              updatedAt: new Date()
            };
            seatsToCreate.push(seat);
            seatIndex++;
          }
        }
      }

      await this.seatModel.create(seatsToCreate);
    } catch (error) {
      console.log('🚀 ~ file: seat.service.ts:46 ~ SeatService ~ createSeats ~ error:', error);
    }
  }
  async getSeatsByEventAndShowTime(eventId: number, showTimeId: number): Promise<Seat[]> {
    return this.seatModel.find({ eventId, showTimeId }).exec();
  }
}
