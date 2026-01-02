import { ConfigService } from '@nestjs/config';

import { IConfig } from './config.interface';

export function getConfig(configService: ConfigService): IConfig {
  return {
    PORT: configService.get<number>('PORT')!,
    DB_TASKS_SERVICE_PASSWORD: configService.get<string>(
      'DB_TASKS_SERVICE_PASSWORD',
    )!,
    DB_TASKS_SERVICE_USER: configService.get<string>('DB_TASKS_SERVICE_USER')!,
    DB_TASKS_SERVICE_NAME: configService.get<string>('DB_TASKS_SERVICE_NAME')!,
    DB_TASKS_SERVICE_HOST: configService.get<string>('DB_TASKS_SERVICE_HOST')!,
    DB_TASKS_SERVICE_PORT: configService.get<number>('DB_TASKS_SERVICE_PORT')!,
    BROKER_URL: configService.get<string>('BROKER_URL')!,
  };
}
