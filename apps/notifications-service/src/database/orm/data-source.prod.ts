import { config } from 'dotenv';

import { DataSource } from 'typeorm';

import { NotificationEntity } from './entities/notification.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_NOTIFICATIONS_SERVICE_HOST,
  port: Number(process.env.DB_NOTIFICATIONS_SERVICE_PORT),
  username: process.env.DB_NOTIFICATIONS_SERVICE_USER,
  password: process.env.DB_NOTIFICATIONS_SERVICE_PASSWORD,
  database: process.env.DB_NOTIFICATIONS_SERVICE_NAME,
  entities: [NotificationEntity],
  migrations: ['dist/database/orm/migrations/*.js'],
  synchronize: false,
  logging: ['query', 'error'],
});
