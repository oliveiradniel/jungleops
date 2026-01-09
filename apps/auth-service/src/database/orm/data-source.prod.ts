import { DataSource } from 'typeorm';

import { config } from 'dotenv';

import { UserEntity } from './entities/user.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_AUTH_SERVICE_HOST,
  port: Number(process.env.DB_AUTH_SERVICE_PORT),
  username: process.env.DB_AUTH_SERVICE_USER,
  password: process.env.DB_AUTH_SERVICE_PASSWORD,
  database: process.env.DB_AUTH_SERVICE_NAME,
  entities: [UserEntity],
  migrations: ['dist/database/orm/migrations/*.js'],
  synchronize: false,
});
