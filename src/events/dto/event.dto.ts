import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  time: string;

  @IsString()
  @IsNotEmpty()
  organizationDate: Date;
}