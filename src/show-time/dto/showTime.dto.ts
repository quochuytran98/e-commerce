import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class TicketTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  seatsPerRow: number;

  @IsString()
  note: string;

  @IsString()
  color: string;

  @IsEmpty()
  @IsString()
  _id: string;
}

export class ShowTimes {
  @IsString()
  @IsNotEmpty()
  dateTime: Date;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsArray()
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => TicketTypeDto) // Transform each item to TicketTypeDto
  @IsNotEmpty()
  ticketTypes: TicketTypeDto[];
}
export class RegisterDto {
  @IsArray()
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => ShowTimes) // Transform each item to RegisterDto
  @IsNotEmpty()
  showTimes: ShowTimes[];

  @IsNumber()
  @IsNotEmpty()
  eventId: number;
}
