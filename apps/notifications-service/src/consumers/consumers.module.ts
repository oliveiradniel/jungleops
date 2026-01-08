import { Module } from '@nestjs/common';

import { RealTimeModule } from 'src/realtime/realtime.module';
import { NotificationsModule } from '../modules/notifications/notifications.module';

import { TaskEventsConsumer } from './task-events.consumer';
import { TaskSignalsConsumer } from './task-signals.consumer';

@Module({
  imports: [RealTimeModule, NotificationsModule],
  controllers: [TaskEventsConsumer, TaskSignalsConsumer],
})
export class ConsumersModule {}
