// src/account/account.controller.ts
import { Controller, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';

@Controller('v1/fe/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAll(@Body() accountData: any): Promise<Account[]> {
    return this.accountService.findAll(accountData);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Account> {
    return this.accountService.findOne({ id: +id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() accountData: Partial<Account>): Promise<Account> {
    return this.accountService.update(+id, accountData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.accountService.remove(+id);
  }
}
