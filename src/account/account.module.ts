// src/account/account.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';

import { SharedModule } from '../shared/shared.module';

import { NAMESPACE } from '../../constants/client.constant';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    SharedModule,
    ClientsModule.register([
      {
        name: NAMESPACE,
        transport: Transport.TCP
      }
    ])
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}
