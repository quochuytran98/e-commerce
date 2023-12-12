// src/account/account.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export default class EventModule {}
