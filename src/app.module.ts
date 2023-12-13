// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
// import { excludeRoutes } from './utils/excludeRoute.util';
// import { AuthMiddleware } from './middleware/auth.middleware';
import { CryptoResponseInterceptor } from './middleware/crypto-response.interceptor';
import { EventModule } from './events/event.module';
import { CategoriesModule } from './categories/categories.module';
import { MeAPI } from './utils/meAPI.util';
import { AuthGuard } from './auth/auth.guard';

import { JwtService } from '@nestjs/jwt';

import { SharedModule } from './shared/shared.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AccountModule,
    AuthModule,
    EventModule,
    CategoriesModule,
    SharedModule
  ], // Thêm AuthModule vào đây
  controllers: [],
  providers: [
    {
      provide: MeAPI,
      useClass: MeAPI // This is where you specify the class to be used
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CryptoResponseInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    JwtService
  ]
})
export class AppModule implements NestModule {
  configure(/*consumer: MiddlewareConsumer */) {
    // consumer.apply(CryptoMiddleware).forRoutes('*');
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude('*')
    //   .forRoutes(...excludeRoutes);
  }
}
