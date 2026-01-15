import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import { microserviceOptions } from './shared/modules-config/microservice.config';
import { getConfig } from './shared/config/config.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const { BROKER_URL, FRONTEND_ORIGIN, PORT } = getConfig(configService);
  app.enableCors({ origin: FRONTEND_ORIGIN, credentials: true });

  await app.listen(PORT);

  app.connectMicroservice(
    microserviceOptions({
      brokerURL: BROKER_URL,
      queue: 'notifications.events.queue',
    }),
  );

  app.connectMicroservice(
    microserviceOptions({
      brokerURL: BROKER_URL,
      queue: 'notifications.signals.queue',
    }),
  );

  app.startAllMicroservices().catch((err) => {
    console.error('RabbitMQ offline, continuing HTTP', err);
  });
}

void bootstrap();
