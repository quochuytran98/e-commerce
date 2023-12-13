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
    return await this.accountModel.create(createAccountDto);
  }
  async findAll(yourCondition): Promise<Account[]> {
    const results = await this.accountModel.findAll({
      where: { yourCondition }
    });

    const plainResults = results.map((result) => result.get({ plain: true }));
    return plainResults;
  }

  async findOne(where: Partial<Account>): Promise<Account> {
    const result = await this.accountModel.findOne({ where });
    const plainResult = result.get({ plain: true });
    return plainResult;
  }
  async update(id: number, accountData: Partial<Account>): Promise<Account> {
    await this.accountModel.update(accountData, { where: { id } });
    return await this.accountModel.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    await await this.accountModel.destroy({ where: { id } });
  }
}
