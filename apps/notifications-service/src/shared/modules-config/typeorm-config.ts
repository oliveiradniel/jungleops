import { DataSourceOptions } from 'typeorm';

import { join } from 'path';

import { getConfig } from '../config/config.helper';

import { NotificationEntity } from 'src/database/orm/entities/notification.entity';

export function typeORMConfigOptions(
  getConfigService: ReturnType<typeof getConfig>,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: getConfigService.DB_NOTIFICATIONS_SERVICE_HOST,
    port: getConfigService.DB_NOTIFICATIONS_SERVICE_PORT,
    username: getConfigService.DB_NOTIFICATIONS_SERVICE_USER,
    password: getConfigService.DB_NOTIFICATIONS_SERVICE_PASSWORD,
    database: getConfigService.DB_NOTIFICATIONS_SERVICE_NAME,
    synchronize: false,
    entities: [NotificationEntity],
    migrations: [join(__dirname, '/orm/migrations/*.{ts,js}')],
  };
}
