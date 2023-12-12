import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Length } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(11)
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 50)
  password: string;
}
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
