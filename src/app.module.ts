// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { excludeRoutes } from './utils/excludeRoute.util';
import { AuthMiddleware } from './middleware/auth.middleware';
import { EventModule } from './events/event.module';
import { CategoriesModule } from './categories/categories.module';
import { JwtService } from '@nestjs/jwt';
import { MeAPIFactory } from './crypto/me-api.factory.ts';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AccountModule, AuthModule, EventModule, CategoriesModule], // Thêm AuthModule vào đây
  controllers: [],
  providers: [JwtService, MeAPIFactory]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('*')
      .forRoutes(...excludeRoutes);
  }
}
