import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { EventsPublisher } from './events.publisher';

import {
  DOMAIN_EVENT_KEYS,
  type TaskCommentCreatedEvent,
  type TaskCreatedEvent,
  type TaskDeletedEvent,
  type TaskUpdatedEvent,
} from '@challenge/shared';

@Controller()
export class EventsConsumer {
  constructor(private readonly eventsPublisher: EventsPublisher) {}

  @EventPattern(DOMAIN_EVENT_KEYS.TASK_CREATED)
  async taskCreated(@Payload() payload: TaskCreatedEvent) {
    await this.eventsPublisher.handleTaskCreated(payload);
  }

  @EventPattern(DOMAIN_EVENT_KEYS.TASK_UPDATED)
  async taskUpdated(@Payload() payload: TaskUpdatedEvent) {
    await this.eventsPublisher.handleTaskUpdated(payload);
  }

  @EventPattern(DOMAIN_EVENT_KEYS.TASK_DELETED)
  async taskDeleted(@Payload() payload: TaskDeletedEvent) {
    await this.eventsPublisher.handleTaskDeleted(payload);
  }

  @EventPattern(DOMAIN_EVENT_KEYS.TASK_COMMENT_CREATED)
  async taskCommentCreated(@Payload() payload: TaskCommentCreatedEvent) {
    await this.eventsPublisher.handleTaskCommentCreated(payload);
  }
}
