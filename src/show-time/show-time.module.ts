import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ShowTimeService } from './show-time.service';
import { ShowTimeController } from './show-time.controller';
import { ShowTime, ShowTimeSchema } from './show-time.schema';
import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '../account/account.module';

import { NAMESPACE } from '../../constants/client.constant';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ShowTime.name, schema: ShowTimeSchema }]),
    SharedModule,
    AccountModule,
    ClientsModule.register([
      {
        name: NAMESPACE,
        transport: Transport.TCP
      }
    ])
  ],
  providers: [ShowTimeService],
  controllers: [ShowTimeController]
})
export class ShowTimeModule {}
