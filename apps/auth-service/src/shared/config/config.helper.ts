import { ConfigService } from '@nestjs/config';

import { IConfig } from './config.interface';

export function getConfig(configService: ConfigService): IConfig {
  return {
    PORT: configService.get<number>('PORT')!,
    JWT_ACCESS_SECRET: configService.get<string>('JWT_ACCESS_SECRET')!,
    JWT_REFRESH_SECRET: configService.get<string>('JWT_REFRESH_SECRET')!,
    DB_AUTH_SERVICE_PASSWORD: configService.get<string>(
      'DB_AUTH_SERVICE_PASSWORD',
    )!,
    DB_AUTH_SERVICE_USER: configService.get<string>('DB_AUTH_SERVICE_USER')!,
    DB_AUTH_SERVICE_NAME: configService.get<string>('DB_AUTH_SERVICE_NAME')!,
    DB_AUTH_SERVICE_HOST: configService.get<string>('DB_AUTH_SERVICE_HOST')!,
    DB_AUTH_SERVICE_PORT: configService.get<number>('DB_AUTH_SERVICE_PORT')!,
  };
}
