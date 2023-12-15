import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShowTime } from './show-time.schema';

import { SequenceService } from '../shared/sequence.service';
@Injectable()
export class ShowTimeService {
  constructor(
    @InjectModel(ShowTime.name)
    private readonly showtimeModel: Model<ShowTime>,
    private readonly sequenceService: SequenceService
  ) {}

  async create(createShowtimeDto: Partial<ShowTime>): Promise<ShowTime> {
    const showId: number = await this.sequenceService.getNextId(ShowTime.name);
    const createdShowtime = await this.showtimeModel.create({ ...createShowtimeDto, id: showId });
    return createdShowtime;
  }

  async findAll(): Promise<ShowTime[]> {
    return this.showtimeModel.find().exec();
  }

  async findOne(id: number): Promise<ShowTime> {
    const showtime = await this.showtimeModel.findById(id);

    if (!showtime) {
      throw new NotFoundException(`ShowTime with id ${id} not found`);
    }

    return showtime;
  }

  async update(id: number, updateShowtimeDto: Partial<ShowTime>): Promise<ShowTime> {
    const showtime = await this.showtimeModel.findByIdAndUpdate(id, updateShowtimeDto, { new: true });

    if (!showtime) {
      throw new NotFoundException(`ShowTime with id ${id} not found`);
    }

    return showtime;
  }

  async remove(id: number): Promise<void> {
    const showtime = await this.showtimeModel.deleteOne({ id });

    if (!showtime) {
      throw new NotFoundException(`ShowTime with id ${id} not found`);
    }
  }
}
