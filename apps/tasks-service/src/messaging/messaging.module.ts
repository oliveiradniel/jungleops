import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { getConfig } from 'src/shared/config/config.helper';

import { EventsPublisherService } from './events-publisher.service';
import { SignalsPublisherService } from './signals-publisher.service';

import { TASKS_CLIENT } from 'src/shared/constants/tokens';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: TASKS_CLIENT,
        inject: [ConfigService],

        useFactory: async (configService: ConfigService) => {
          const { BROKER_URL } = getConfig(configService);

          return {
            transport: Transport.RMQ,
            options: {
              urls: [BROKER_URL],
              queue: 'tasks-queue',
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
  ],
  providers: [EventsPublisherService, SignalsPublisherService],
  exports: [ClientsModule, EventsPublisherService, SignalsPublisherService],
})
export class MessagingModule {}
