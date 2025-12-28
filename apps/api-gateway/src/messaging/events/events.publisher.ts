import { Injectable } from '@nestjs/common';

import { EventsService } from './events.service';

import {
  type TaskCreatedEvent,
  type TaskDeletedEvent,
  type TaskUpdatedEvent,
  type TaskCommentCreatedEvent,
} from '@challenge/shared';

@Injectable()
export class EventsPublisher {
  constructor(private readonly eventsService: EventsService) {}

  async handleTaskCreated(payload: TaskCreatedEvent) {
    const { authorId, task } = payload;

    await this.eventsService.taskCreated({ authorId, task });
  }

  async handleTaskUpdated(payload: TaskUpdatedEvent) {
    const { authorId, task, oldData, newData } = payload;

    await this.eventsService.taskUpdated({
      authorId,
      task,
      oldData,
      newData,
    });
  }

  async handleTaskDeleted(payload: TaskDeletedEvent) {
    const { authorId, task } = payload;

    await this.eventsService.taskDeleted({ authorId, task });
  }

  handleTaskCommentCreated(payload: TaskCommentCreatedEvent) {
    const { authorId, task } = payload;

    this.eventsService.taskCommentCreated({ authorId, task });
  }
}
