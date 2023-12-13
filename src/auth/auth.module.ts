// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PasswordService } from './password.service';
// import { AuthService } from './auth.service';
import { AccountModule } from '../account/account.module'; // Thêm dòng này

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: 'javainuse-secret-key',
        signOptions: { expiresIn: '24h' } // Customize token expiration as needed
      })
    }),
    AccountModule // Thêm AccountModule vào đây
  ],
  controllers: [AuthController],
  providers: [PasswordService],
  exports: [PasswordService]
})
export class AuthModule {}
