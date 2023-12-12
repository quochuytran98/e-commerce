// src/account/account.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories } from './Categories.entity';
import { CategoriesController } from './Categories.controller';
import { CategoriesService } from './Categories.service';

import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [SequelizeModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
