import { ConfigService } from '@nestjs/config';

import { IConfig } from './config.interface';

export function getConfig(configService: ConfigService): IConfig {
  return {
    PORT: configService.get<number>('PORT')!,
    FRONTEND_ORIGIN: configService.get<string>('FRONTEND_ORIGIN')!,
    AUTH_SERVICE_BASE_URL: configService.get<string>('AUTH_SERVICE_BASE_URL')!,
    USERS_SERVICE_BASE_URL: configService.get<string>(
      'USERS_SERVICE_BASE_URL',
    )!,
    TASKS_SERVICE_BASE_URL: configService.get<string>(
      'TASKS_SERVICE_BASE_URL',
    )!,
    TASK_AUDIT_LOGS_SERVICE_BASE_URL: configService.get<string>(
      'TASK_AUDIT_LOGS_SERVICE_BASE_URL',
    )!,
    USERS_TASKS_SERVICE_BASE_URL: configService.get<string>(
      'USERS_TASKS_SERVICE_BASE_URL',
    )!,
    NOTIFICATIONS_SERVICE_BASE_URL: configService.get<string>(
      'NOTIFICATIONS_SERVICE_BASE_URL',
    )!,
    JWT_ACCESS_SECRET: configService.get<string>('JWT_ACCESS_SECRET')!,
    JWT_REFRESH_SECRET: configService.get<string>('JWT_REFRESH_SECRET')!,
    BROKER_URL: configService.get<string>('BROKER_URL')!,
  };
}
