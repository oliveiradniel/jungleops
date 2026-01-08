import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { ConsumersModule } from './consumers/consumers.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

import { configModuleOptions } from './shared/modules-config/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    DatabaseModule,
    ConsumersModule,
    NotificationsModule,
  ],
})
export class AppModule {}
