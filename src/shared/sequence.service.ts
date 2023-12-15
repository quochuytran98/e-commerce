// src/account/sequence.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sequence } from './sequence.schema';

@Injectable()
export class SequenceService {
  constructor(@InjectModel(Sequence.name) private readonly sequenceModel: Model<Sequence>) {}

  async getNextId(modelName: string): Promise<number> {
    const sequence = await this.sequenceModel.findOneAndUpdate(
      { modelName },
      { $inc: { value: 1 } },
      { upsert: true, new: true }
    );

    return sequence.value;
  }
  async getMultipleNextId(modelName: string, value: number): Promise<number[]> {
    const currentId = await this.sequenceModel.findOne({ modelName });
    const sequence = await this.sequenceModel.findOneAndUpdate(
      { modelName },
      { $inc: { value } },
      { upsert: true, new: true }
    );

    const nextIds: number[] = [];

    for (let i = currentId.value; i < sequence.value; i++) {
      nextIds.push(i + 1);
    }

    return nextIds;
  }
}
