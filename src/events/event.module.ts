// src/events/event.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventService } from './event.service';
import { Event, EventSchema } from './event.schema';
import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '../account/account.module';

import { NAMESPACE } from '../../constants/client.constant';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    SharedModule,
    AccountModule,
    ClientsModule.register([
      {
        name: NAMESPACE,
        transport: Transport.TCP
      }
    ])
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule {}
