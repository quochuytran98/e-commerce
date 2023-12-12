// src/account/account.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: typeof Account
  ) {}

  async create(createAccountDto: Partial<Account>): Promise<Account> {
    return this.accountModel.create(createAccountDto);
  }
  async findAll(): Promise<Account[]> {
    return this.accountModel.findAll();
  }

  async findOne(where: Partial<Account>): Promise<Account> {
    return this.accountModel.findOne({ where });
  }
  async update(id: number, accountData: Partial<Account>): Promise<Account> {
    await this.accountModel.update(accountData, { where: { id } });
    return this.accountModel.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    await this.accountModel.destroy({ where: { id } });
  }
}
