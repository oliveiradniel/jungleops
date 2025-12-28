import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  DOMAIN_EVENT_KEYS,
  TaskCommentCreatedEvent,
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskUpdatedEvent,
} from '@challenge/shared';

import { TASKS_CLIENT } from 'src/shared/constants/tokens';

@Injectable()
export class EventsPublisherService {
  constructor(@Inject(TASKS_CLIENT) private readonly client: ClientProxy) {}

  taskCreated(payload: TaskCreatedEvent) {
    const { authorId, task } = payload;

    this.client.emit<string, TaskCreatedEvent>(DOMAIN_EVENT_KEYS.TASK_CREATED, {
      authorId,
      task,
    });
  }

  taskUpdated(payload: TaskUpdatedEvent) {
    const { authorId, task, oldData, newData } = payload;

    this.client.emit<string, TaskUpdatedEvent>(DOMAIN_EVENT_KEYS.TASK_UPDATED, {
      authorId,
      task,
      oldData,
      newData,
    });
  }

  taskDeleted(payload: TaskDeletedEvent) {
    const { authorId, task } = payload;

    this.client.emit<string, TaskDeletedEvent>(DOMAIN_EVENT_KEYS.TASK_DELETED, {
      authorId,
      task,
    });
  }

  taskCommentCreated(payload: TaskCommentCreatedEvent) {
    const { authorId, task } = payload;

    this.client.emit<string, TaskCommentCreatedEvent>(
      DOMAIN_EVENT_KEYS.TASK_COMMENT_CREATED,
      {
        authorId,
        task,
      },
    );
  }
}
