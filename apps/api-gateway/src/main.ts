import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import { JWTAuthGuard } from './modules/auth/jwt-auth.guard';
import { HttpProxyErrorFilter } from './filters/http-proxy-error.filter';

import { getConfig } from './shared/config/config.helper';
import { microserviceOptions } from './shared/modules-config/microservice.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const { PORT, FRONTEND_ORIGIN, BROKER_URL } = getConfig(
    app.get(ConfigService),
  );

  const reflector = app.get(Reflector);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpProxyErrorFilter());
  app.useGlobalGuards(new JWTAuthGuard(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  });

  await app.listen(PORT);

  app.connectMicroservice(
    microserviceOptions({ brokerURL: BROKER_URL, queue: 'tasks-queue' }),
  );

  app.startAllMicroservices().catch((err) => {
    console.error('RabbitMQ offline, continuing HTTP', err);
  });

  const config = new DocumentBuilder()
    .setTitle('Collaborative Task Management System - JungleOps | API Gateway')
    .setDescription(
      'API Gateway central to the collaborative task management system. Manage JWT authentication, routing and integration between NestJS services via RabbitMQ.',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    jsonDocumentUrl: 'api/swagger/json',
  });
}

void bootstrap();
