import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Then combine it with your microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP
  });

  await app.startAllMicroservices();
  await app.listen(7000);
}

bootstrap();
