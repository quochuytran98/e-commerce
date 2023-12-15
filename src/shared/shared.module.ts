// src/shared/shared.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountModule } from '../account/account.module'; // Thêm dòng này
import { Sequence, SequenceSchema } from './sequence.schema';
import { SequenceService } from './sequence.service';

@Module({
  imports: [
    forwardRef(() => AccountModule),
    MongooseModule.forFeature([{ name: Sequence.name, schema: SequenceSchema }])
  ],
  providers: [AuthGuard, JwtService, SequenceService],
  exports: [AuthGuard, JwtService, SequenceService]
})
export class SharedModule {}
