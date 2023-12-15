// src/account/account.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.schema';

import { SequenceService } from '../shared/sequence.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
    private readonly sequenceService: SequenceService
  ) {}

  async create(createAccountDto: Partial<Account>): Promise<Account> {
    const accountId = await this.sequenceService.getNextId(Account.name);
    const createdAccount = new this.accountModel({ id: accountId, ...createAccountDto });
    return createdAccount.save();
  }

  async findAll(yourCondition: object): Promise<Account[]> {
    return this.accountModel.find({ yourCondition }).exec();
  }

  async findOne(filter: object): Promise<Account> {
    return this.accountModel.findOne(filter).exec();
  }

  async update(id: number, accountData: Partial<Account>): Promise<Account> {
    await this.accountModel.updateOne({ _id: id }, accountData).exec();
    return this.accountModel.findById(id).exec();
  }

  async remove(id: number): Promise<void> {
    await this.accountModel.deleteOne({ _id: id }).exec();
  }
}
