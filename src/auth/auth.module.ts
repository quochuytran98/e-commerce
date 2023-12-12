// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PasswordService } from './password.service';
import { AccountModule } from '../account/account.module'; // Thêm dòng này

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret',
      signOptions: { expiresIn: '7d' },
    }),
    AccountModule, // Thêm AccountModule vào đây
  ],
  controllers: [AuthController],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class AuthModule {}
