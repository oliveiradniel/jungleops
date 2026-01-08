import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getConfig } from 'src/shared/config/config.helper';
import { typeORMConfigOptions } from 'src/shared/modules-config/typeorm-config';

import { NotificationEntity } from './orm/entities/notification.entity';

import { NotificationsRepository } from './orm/repositories/notifications.repository';

import { NOTIFICATIONS_REPOSITORY } from 'src/shared/constants/tokens';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const getConfigService = getConfig(configService);

        return typeORMConfigOptions(getConfigService);
      },
    }),
    TypeOrmModule.forFeature([NotificationEntity]),
  ],
  providers: [
    { provide: NOTIFICATIONS_REPOSITORY, useClass: NotificationsRepository },
  ],
  exports: [TypeOrmModule, NOTIFICATIONS_REPOSITORY],
})
export class DatabaseModule {}
