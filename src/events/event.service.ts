// src/event/event.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.schema';

import { SequenceService } from '../shared/sequence.service';
@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) // Adjusted for Mongoose
    private readonly eventModel: Model<Event>,
    private readonly sequenceService: SequenceService
  ) {}

  async create(createEventDto: Partial<Event>): Promise<Event> {
    const eventId = await this.sequenceService.getNextId(Event.name);
    const result = await this.eventModel.create({ id: eventId, ...createEventDto });
    return result;
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(filter: object): Promise<Event> {
    return this.eventModel.findOne(filter).exec();
  }

  async update(filter: object, eventData: Partial<Event>): Promise<Event> {
    return this.eventModel.findOneAndUpdate(filter, eventData, { new: true }).exec();
  }

  async findMany(filter: object, projection: object, options: object): Promise<Event[]> {
    return this.eventModel.find(filter, projection, options).exec();
  }

  async remove(where: object): Promise<void> {
    await this.eventModel.deleteOne(where).exec();
  }
}
