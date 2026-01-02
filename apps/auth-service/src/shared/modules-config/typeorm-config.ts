import { DataSourceOptions } from 'typeorm';

import { join } from 'path';

import { getConfig } from '../config/config.helper';

import { UserEntity } from 'src/database/orm/entities/user.entity';

export function typeORMConfigOptions(
  getConfigService: ReturnType<typeof getConfig>,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: getConfigService.DB_AUTH_SERVICE_HOST,
    port: getConfigService.DB_AUTH_SERVICE_PORT,
    username: getConfigService.DB_AUTH_SERVICE_USER,
    password: getConfigService.DB_AUTH_SERVICE_PASSWORD,
    database: getConfigService.DB_AUTH_SERVICE_NAME,
    synchronize: false,
    entities: [UserEntity],
    migrations: [join(__dirname, '/orm/migrations/*.{ts,js}')],
  };
}
