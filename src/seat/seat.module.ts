import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';

import { SharedModule } from '../shared/shared.module';
import { Seat, SeatSchema } from './seat.schema';
import { NAMESPACE } from '../../constants/client.constant';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
    SharedModule,
    ClientsModule.register([
      {
        name: NAMESPACE,
        transport: Transport.TCP
      }
    ])
  ],
  providers: [SeatService],
  controllers: [SeatController]
})
export class SeatModule {}
