import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import { getConfig } from './shared/config/config.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = getConfig(app.get(ConfigService)).PORT;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(PORT);
}

void bootstrap();
