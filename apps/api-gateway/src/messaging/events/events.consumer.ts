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
  taskCreated(@Payload() payload: TaskCreatedEvent) {
    this.eventsPublisher.handleTaskCreated(payload);
  }

  @EventPattern(DOMAIN_EVENT_KEYS.TASK_UPDATED)
  taskUpdated(@Payload() payload: TaskUpdatedEvent) {
    this.eventsPublisher.handleTaskUpdated(payload);
  }

  @EventPattern(DOMAIN_EVENT_KEYS.TASK_DELETED)
  taskDeleted(@Payload() payload: TaskDeletedEvent) {
    this.eventsPublisher.handleTaskDeleted(payload);
  }

  @EventPattern(DOMAIN_EVENT_KEYS.TASK_COMMENT_CREATED)
  taskCommentCreated(@Payload() payload: TaskCommentCreatedEvent) {
    this.eventsPublisher.handleTaskCommentCreated(payload);
  }
}
