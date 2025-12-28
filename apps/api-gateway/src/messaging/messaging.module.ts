import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { getConfig } from 'src/shared/config/config.helper';

import { UsersModule } from 'src/modules/users/users.module';

import { EventsConsumer } from './events/events.consumer';
import { EventsPublisher } from './events/events.publisher';
import { EventsService } from './events/events.service';
import { SignalsConsumer } from './signals/signals.consumer';
import { SignalsPublisher } from './signals/signals.publisher';
import { SignalsService } from './signals/signals.service';

import {
  NOTIFICATIONS_EVENTS,
  NOTIFICATIONS_SIGNALS,
} from 'src/shared/constants/tokens';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_EVENTS,
        inject: [ConfigService],

        useFactory: async (configService: ConfigService) => {
          const { BROKER_URL } = getConfig(configService);

          return {
            transport: Transport.RMQ,
            options: {
              urls: [BROKER_URL],
              queue: 'notifications.events.queue',
              queueOptions: { durable: true },
            },
          };
        },
      },
      {
        name: NOTIFICATIONS_SIGNALS,
        inject: [ConfigService],

        useFactory: async (configService: ConfigService) => {
          const { BROKER_URL } = getConfig(configService);

          return {
            transport: Transport.RMQ,
            options: {
              urls: [BROKER_URL],
              queue: 'notifications.signals.queue',
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [EventsConsumer, SignalsConsumer],
  providers: [EventsPublisher, EventsService, SignalsPublisher, SignalsService],
})
export class MessagingModule {}
