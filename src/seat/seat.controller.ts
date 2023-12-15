import { Controller, Inject, Logger, Post, Body } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { NAMESPACE } from '../../constants/client.constant';
import { SeatService } from './seat.service';

import { TicketTypes } from '../show-time/interfaces/showTime.interface';

@Controller('seat')
export class SeatController {
  private readonly logger = new Logger(SeatController.name);
  constructor(
    @Inject(NAMESPACE) private client: ClientProxy,
    private readonly seatService: SeatService
  ) {}

  @MessagePattern('createSeat')
  async createSeats(payload: any): Promise<void> {
    const showTimeId: number = payload.showTimeId;
    const eventId: number = payload.eventId;
    const ticketTypes: TicketTypes[] = payload.ticketTypes;
    return await this.seatService.createSeats(showTimeId, ticketTypes, eventId);
  }
}
