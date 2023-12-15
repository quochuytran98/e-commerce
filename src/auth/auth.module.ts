// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PasswordService } from './password.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AuthService } from './auth.service';
import { AccountModule } from '../account/account.module';

import { NAMESPACE } from '../../constants/client.constant';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: 'javainuse-secret-key',
        signOptions: { expiresIn: '24h' } // Customize token expiration as needed
      })
    }),
    AccountModule,
    ClientsModule.register([
      {
        name: NAMESPACE,
        transport: Transport.TCP
      }
    ])
  ],
  controllers: [AuthController],
  providers: [PasswordService],
  exports: [PasswordService]
})
export class AuthModule {}
