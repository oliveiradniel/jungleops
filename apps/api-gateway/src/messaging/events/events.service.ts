import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { UsersService } from 'src/modules/users/users.service';

import {
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskUpdatedEvent,
  TaskCommentCreatedEvent,
  TaskCreatedNotification,
  TaskTitleUpdatedNotification,
  TaskStatusUpdatedNotification,
  TaskPriorityUpdatedNotification,
  TaskTermUpdatedNotification,
  TaskAssignedNotification,
  TaskUnassignedNotification,
  TaskDeletedNotification,
  TaskCommentCreatedNotification,
  EVENT_KEYS,
} from '@challenge/shared';

import { NOTIFICATIONS_EVENTS } from 'src/shared/constants/tokens';

@Injectable()
export class EventsService {
  constructor(
    @Inject(NOTIFICATIONS_EVENTS) private readonly client: ClientProxy,
    private readonly usersService: UsersService,
  ) {}

  async taskCreated(payload: TaskCreatedEvent) {
    const { authorId, task } = payload;

    const userIds = await this.usersService.listUserIds();

    this.client.emit<string, TaskCreatedNotification>(EVENT_KEYS.TASK_CREATED, {
      authorId,
      targetUserIds: userIds,
      task,
    });
  }

  async taskUpdated(payload: TaskUpdatedEvent) {
    const { authorId, task, oldData, newData } = payload;
    const { id, removedParticipantIds, addedParticipantIds, participantIds } =
      task;
    const { title, status, priority, term } = newData;

    const parsedTitle = newData.title ?? (oldData.title as string);

    const hasTitleBeenUpdated = title !== undefined && title !== oldData.title;
    const hasStatusBeenUpdated =
      status !== undefined && status !== oldData.status;
    const hasPriorityBeenUpdated =
      priority !== undefined && priority !== oldData.priority;
    const hasTermBeenUpdated = term !== undefined && term !== oldData.term;
    const hasAssignedUser = addedParticipantIds.length > 0;
    const hasUnassignedUser = removedParticipantIds.length > 0;

    if (hasTitleBeenUpdated) {
      this.client.emit<string, TaskTitleUpdatedNotification>(
        EVENT_KEYS.TASK_TITLE_UPDATED,
        {
          authorId,
          task: {
            id,
            participantIds,
            oldTitle: oldData.title,
            newTitle: title,
          },
        },
      );
    }

    if (hasStatusBeenUpdated) {
      this.client.emit<string, TaskStatusUpdatedNotification>(
        EVENT_KEYS.TASK_STATUS_UPDATED,
        {
          authorId,
          task: {
            id,
            participantIds,
            title: parsedTitle,
            oldStatus: oldData.status,
            newStatus: status,
          },
        },
      );
    }

    if (hasPriorityBeenUpdated) {
      this.client.emit<string, TaskPriorityUpdatedNotification>(
        EVENT_KEYS.TASK_PRIORITY_UPDATED,
        {
          authorId,
          task: {
            id,
            participantIds,
            title: parsedTitle,
            oldPriority: oldData.priority,
            newPriority: priority,
          },
        },
      );
    }

    if (hasTermBeenUpdated) {
      this.client.emit<string, TaskTermUpdatedNotification>(
        EVENT_KEYS.TASK_TERM_UPDATED,
        {
          authorId,
          task: {
            id,
            participantIds,
            title: parsedTitle,
            oldTerm: oldData.term,
            newTerm: term,
          },
        },
      );
    }

    if (hasAssignedUser) {
      this.client.emit<string, TaskAssignedNotification>(
        EVENT_KEYS.TASK_ASSIGNED,
        {
          authorId,
          task: {
            id,
            addedParticipantIds,
            participantIds,
            title: parsedTitle,
            priority: priority ?? oldData.priority,
          },
        },
      );
    }

    if (hasUnassignedUser) {
      this.client.emit<string, TaskUnassignedNotification>(
        EVENT_KEYS.TASK_UNASSIGNED,
        {
          authorId,
          task: {
            id,
            title: parsedTitle,
            participantIds,
            removedParticipantIds,
          },
        },
      );
    }
  }

  async taskDeleted(payload: TaskDeletedEvent) {
    const { authorId, task } = payload;

    const userIds = await this.usersService.listUserIds();

    this.client.emit<string, TaskDeletedNotification>(EVENT_KEYS.TASK_DELETED, {
      authorId,
      targetUserIds: userIds,
      task,
    });
  }

  taskCommentCreated(payload: TaskCommentCreatedEvent) {
    const { authorId, task } = payload;

    this.client.emit<string, TaskCommentCreatedNotification>(
      EVENT_KEYS.TASK_COMMENT_CREATED,
      {
        authorId,
        task,
      },
    );
  }
}
