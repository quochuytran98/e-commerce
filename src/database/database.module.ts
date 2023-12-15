// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ticket'),
    ConfigModule.forRoot() // Load environment variables
  ]
})
export class DatabaseModule {}
