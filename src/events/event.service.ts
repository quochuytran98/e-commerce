// src/event/event.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event
  ) {}

  async create(createEventDto: Partial<Event>): Promise<Event> {
    return this.eventModel.create(createEventDto);
  }
  async findAll(): Promise<Event[]> {
    return this.eventModel.findAll();
  }

  async findOne(where: Partial<Event>): Promise<Event> {
    return this.eventModel.findOne({ where });
  }
  async update(id: number, eventData: Partial<Event>): Promise<Event> {
    await this.eventModel.update(eventData, { where: { id } });
    return this.eventModel.findByPk(id);
  }
  async findMany(): Promise<Event[]> {
    return this.eventModel.findAll();
  }

  async remove(id: number): Promise<void> {
    await this.eventModel.destroy({ where: { id } });
  }
}
