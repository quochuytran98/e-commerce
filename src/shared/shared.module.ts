// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

import { AccountModule } from '../account/account.module'; // Thêm dòng này

import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [AccountModule],
  providers: [AuthGuard, JwtService],
  exports: [AuthGuard, JwtService]
})
export class SharedModule {}
