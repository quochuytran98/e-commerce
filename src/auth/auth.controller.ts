// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Logger,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Inject
} from '@nestjs/common';

import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service'; // Import AccountService
import { PasswordService } from './password.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { RegisterAccountResponse } from './interfaces/register-account.interface';

import { Public } from '../decorators/public.decorator';

import { NAMESPACE } from '../../constants/client.constant';
@Controller('v1/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    @Inject(NAMESPACE) private client: ClientProxy,
    private readonly accountService: AccountService, // Inject AccountService
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
    // @Inject('TICKET') private readonly client: ClientProxy
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const password: string = loginDto.password;
      const accountInfo = await this.accountService.findOne({
        phone: loginDto.phone
      });

      if (!accountInfo) {
        throw new HttpException({ message: 'Authentication failed' }, HttpStatus.UNAUTHORIZED);
      }

      const isPasswordValid = await this.passwordService.comparePassword(password, accountInfo.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const infoSign = {
        phone: accountInfo.phone,
        email: accountInfo.email,
        fullName: accountInfo.fullName
      };
      const token = await this.jwtService.signAsync(infoSign, { secret: 'javainuse-secret-key' });
      // const pattern = { cmd: 'sum' };
      // const data = [1, 2, 3, 4, 5];
      // const tesst = await this.client.send<number>(pattern, data).toPromise();
      // console.log('🚀 ~ file: auth.controller.ts:61 ~ AuthController ~ login ~ tesst:', tesst);
      return { token: token };
    } catch (error) {
      // Xử lý lỗi xác thực
      throw new HttpException({ message: 'Authentication failed', errors: error }, HttpStatus.UNAUTHORIZED);
    }
  }

  @MessagePattern({ cmd: 'sum' })
  @Public()
  @Post('register')
  async register(@Body() registerAccountDto: RegisterDto): Promise<RegisterAccountResponse> {
    const result: RegisterAccountResponse = {
      code: 201,
      message: 'Thất bại',
      account: null
    };
    try {
      const phone = registerAccountDto.phone;
      const existedAccount = await this.accountService.findOne({
        phone
      });
      if (existedAccount?.phone) {
        result.code = 203;
        result.message = 'Số điện thoại đã có trong hệ thống';
        result.account = null;
        return result;
      }
      const hashedPassword = await this.passwordService.hashPassword(registerAccountDto.password);
      registerAccountDto = {
        ...registerAccountDto,
        password: hashedPassword
      };
      const createdAccount = await this.accountService.create(registerAccountDto);
      this.logger.log(`REGISTER_ACCOUNT ==> ${JSON.stringify(createdAccount)}`);
      result.code = 200;
      result.message = 'Thành công';
      result.account = createdAccount;
    } catch (error) {
      this.logger.log(`createdAccount ${JSON.stringify(error)}`);
      result.code = 205;
      result.message = 'Thất bại';
      result.account = null;
    }
    return result;
  }
}
