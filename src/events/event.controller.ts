// src/auth/auth.controller.ts
import { Controller, Post, Body, Logger, Get, Put, Param, UseGuards, Request } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { EventService } from './event.service'; // Import EventService
import { RegisterDto } from './dto/event.dto';
import { Event } from './event.entity';
import { RegisterEventResponse } from './interfaces/register-account.interface';
import { Public } from '../decorators/public.decorator';

import { AuthGuard } from '../auth/auth.guard';
@Controller('v1/event')
export class EventController {
  private readonly logger = new Logger(EventController.name);
  constructor(
    private readonly eventService: EventService // Inject EventService
  ) {}

  // @Public()
  @UseGuards(AuthGuard)
  @Post('create')
  async register(@Body() registerEventDto: RegisterDto, @Request() req): Promise<RegisterEventResponse> {
    const response: RegisterEventResponse = {
      success: false,
      message: 'Thất bại',
      data: null
    };
    try {
      const user = req['user'];
      console.log('🚀 ~ file: event.controller.ts:29 ~ EventController ~ register ~ user:', user);
      const currentDate = dayjs(new Date());
      const organizationDate = dayjs(registerEventDto.organizationDate);

      if (organizationDate.isBefore(currentDate)) {
        response.success = false;
        response.message = 'Ngày bắt đầu sự kiện phải lớn hơn ngày hiện tại';
      }
      const data = {
        ...registerEventDto,
        organizationId: user.id
      };

      const createdEvent: Event = await this.eventService.create(data);
      response.data = createdEvent;
      response.success = true;
      response.message = 'Thành công';
    } catch (error) {
      // Log the error
      this.logger.error(`REGISTER_EVENT ==> ERROR ==> ${error.message}`);
      // Handle the error
      response.success = false;
      response.message = 'Thất bại';
    }
    return response;
  }

  @Put(':id/update')
  async update(@Param('id') id: number, @Body() updateEventDto: Partial<Event>): Promise<Event> {
    return this.eventService.update(id, updateEventDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Event> {
    return this.eventService.findOne({ id: id });
  }

  @Public()
  @Get()
  async findMany(): Promise<Event[]> {
    return this.eventService.findMany();
  }
}
