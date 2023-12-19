// src/auth/auth.controller.ts
import { Controller, Post, Body, Logger, UseGuards, Request, Inject } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ShowTimeService } from './show-time.service'; // Import ShowTimeService
import { RegisterDto, ShowTimes } from './dto/showTime.dto';
import { RegisterShowTimeResponse } from './interfaces/showTime.interface';
import { Public } from '../decorators/public.decorator';

import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { NAMESPACE } from '../../constants/client.constant';
import { AuthGuard } from '../auth/auth.guard';
import { ShowTimeResponse, TicketTypes } from './interfaces/showTime.interface';
@Controller('v1/showTime')
export class ShowTimeController {
  private readonly logger = new Logger(ShowTimeController.name);
  constructor(
    @Inject(NAMESPACE) private client: ClientProxy,
    private readonly showTimeService: ShowTimeService // Inject ShowTimeService
  ) {}

  // @Public()
  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() payload: RegisterDto, @Request() req): Promise<RegisterShowTimeResponse> {
    const response: RegisterShowTimeResponse = {
      code: 200,
      message: 'Tạo show diễn thất bại',
      data: null
    };
    try {
      const showTimes: ShowTimes[] = payload.showTimes;
      const user = req['user'];
      const eventId: number = payload.eventId;
      for (let i = 0; i < showTimes.length; i++) {
        const dateTime: Date = showTimes[i].dateTime;
        const location: string = showTimes[i].location;
        const ticketTypes: Partial<TicketTypes[]> = showTimes[i].ticketTypes;
        const accountId: number = user.id;
        const currentDate = dayjs(new Date());
        const organizationDate = dayjs(dateTime);

        if (organizationDate.isBefore(currentDate)) {
          response.code = 200;
          response.message = 'Ngày bắt đầu sự kiện phải lớn hơn ngày hiện tại';
          return response;
        }
        const pattern = 'findOneEvent';
        const eventInfo: any = await this.client.send<object>(pattern, { id: eventId }).toPromise();
        if (!eventInfo?.id) {
          response.message = 'Không tìm thấy thông tin sự kiện';
          return response;
        }
        const showTimeData: Partial<ShowTimeResponse> = {
          eventId,
          accountId,
          dateTime,
          location,
          ticketTypes
        };

        const createdShowTime: any = await this.showTimeService.create(showTimeData);
        if (!createdShowTime?.id) {
          response.message = 'Tạo show diễn thất bại. (E01)';
          return response;
        }
        const ticketTypeInfo: TicketTypes[] = createdShowTime?.ticketTypes;

        const seatPattern = 'createSeat';
        const seatObj = {
          ticketTypes: ticketTypeInfo,
          showTimeId: createdShowTime.id,
          eventId
        };
        const createdSeat: any = await this.client.send<object>(seatPattern, seatObj).toPromise();
        this.logger.log('CREATED_SEAT ==>' + JSON.stringify(createdSeat));
        response.data = createdShowTime;
        response.code = 200;
        response.message = 'Thành công';
      }
    } catch (error) {
      this.logger.error(`REGISTER_SHOW_TIME ==> ERROR ==> ${error.message}`);
      response.code = 201;
      response.message = 'Tạo show diễn thất bại. Vui lòng thử lại sau!';
    }
    return response;
  }
}
