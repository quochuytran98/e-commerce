// src/events/event.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '../account/account.module';
@Module({
  imports: [SequelizeModule.forFeature([Event]), SharedModule, AccountModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule {}
