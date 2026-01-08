import { ConfigService } from '@nestjs/config';

import { IConfig } from './config.interface';

export function getConfig(configService: ConfigService): IConfig {
  return {
    PORT: configService.get<number>('PORT')!,
    DB_NOTIFICATIONS_SERVICE_PASSWORD: configService.get<string>(
      'DB_NOTIFICATIONS_SERVICE_PASSWORD',
    )!,
    DB_NOTIFICATIONS_SERVICE_USER: configService.get<string>(
      'DB_NOTIFICATIONS_SERVICE_USER',
    )!,
    DB_NOTIFICATIONS_SERVICE_NAME: configService.get<string>(
      'DB_NOTIFICATIONS_SERVICE_NAME',
    )!,
    DB_NOTIFICATIONS_SERVICE_HOST: configService.get<string>(
      'DB_NOTIFICATIONS_SERVICE_HOST',
    )!,
    DB_NOTIFICATIONS_SERVICE_PORT: configService.get<number>(
      'DB_NOTIFICATIONS_SERVICE_PORT',
    )!,
    FRONTEND_ORIGIN: configService.get<string>('FRONTEND_ORIGIN')!,
    BROKER_URL: configService.get<string>('BROKER_URL')!,
  };
}
