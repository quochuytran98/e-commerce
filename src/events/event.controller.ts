// src/event/event.controller.ts
import { Controller, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

@Controller('v1/fe/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventService.findOne({ id: +id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() eventData: Partial<Event>): Promise<Event> {
    return this.eventService.update(+id, eventData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.eventService.remove(+id);
  }
}
