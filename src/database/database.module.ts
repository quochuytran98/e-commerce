// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ltht1999:quochuy98@cluster1.dz34val.mongodb.net/ticket'),
    ConfigModule.forRoot() // Load environment variables
  ]
})
export class DatabaseModule {}
