import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { RealTimeGateway } from 'src/realtime/realtime.gateway';

import { NotificationsService } from '../modules/notifications/notifications.service';

import {
  type TaskCreatedNotification,
  type TaskTitleUpdatedNotification,
  type TaskStatusUpdatedNotification,
  type TaskPriorityUpdatedNotification,
  type TaskTermUpdatedNotification,
  type TaskAssignedNotification,
  type TaskDeletedNotification,
  type TaskCommentCreatedNotification,
  type TaskUnassignedNotification,
  type NotificationKind,
  EVENT_KEYS,
} from '@challenge/shared';

@Controller()
export class TaskEventsConsumer {
  constructor(
    private readonly realTimeGateway: RealTimeGateway,
    private readonly notificationsService: NotificationsService,
  ) {}

  @EventPattern(EVENT_KEYS.TASK_CREATED)
  async taskCreated(@Payload() payload: TaskCreatedNotification) {
    const { targetUserIds, author, task } = payload;

    await this.persistNotification({
      targetUserIds,
      notificationKind: 'task.created',
      metadata: {
        author,
        task,
      },
    });

    this.realTimeGateway.notifyCreatedTask(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_TITLE_UPDATED)
  async taskTitleUpdated(@Payload() payload: TaskTitleUpdatedNotification) {
    const { task, author } = payload;

    const targetUserIds = task.participantIds.filter(
      (userId) => userId !== author.id,
    );

    await this.persistNotification({
      targetUserIds,
      notificationKind: 'task.title.updated',
      metadata: {
        author,
        task,
      },
    });

    this.realTimeGateway.notifyUpdatedTaskTitle(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_STATUS_UPDATED)
  async taskStatusUpdated(
    @Payload()
    payload: TaskStatusUpdatedNotification,
  ) {
    const { author, task } = payload;

    const targetUserIds = task.participantIds.filter(
      (userId) => userId !== author.id,
    );

    await this.persistNotification({
      targetUserIds,
      notificationKind: 'task.status.updated',
      metadata: {
        author,
        task,
      },
    });

    this.realTimeGateway.notifyUpdatedTaskStatus(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_PRIORITY_UPDATED)
  async taskPriorityUpdated(
    @Payload()
    payload: TaskPriorityUpdatedNotification,
  ) {
    const { author, task } = payload;

    const targetUserIds = task.participantIds.filter(
      (userId) => userId !== author.id,
    );

    await this.persistNotification({
      targetUserIds,
      notificationKind: 'task.priority.updated',
      metadata: {
        author,
        task,
      },
    });

    this.realTimeGateway.notifyUpdatedTaskPriority(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_TERM_UPDATED)
  async taskTermUpdated(@Payload() payload: TaskTermUpdatedNotification) {
    const { author, task } = payload;

    const targetUserIds = task.participantIds.filter(
      (userId) => userId !== author.id,
    );

    await this.persistNotification({
      targetUserIds,
      notificationKind: 'task.term.updated',
      metadata: {
        author,
        task,
      },
    });
  }

  @EventPattern(EVENT_KEYS.TASK_ASSIGNED)
  async taskAssigned(@Payload() payload: TaskAssignedNotification) {
    const { author, task } = payload;

    const targetUserIds = task.participantIds.filter(
      (userId) => userId !== author.id,
    );

    await this.persistNotification({
      targetUserIds,
      notificationKind: 'task.assigned',
      metadata: {
        author,
        task,
      },
    });

    this.realTimeGateway.notifyAssignedUsers(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_UNASSIGNED)
  async taskUnassigned(@Payload() payload: TaskUnassignedNotification) {
    const { author, task } = payload;

    const targetUserIds = task.removedParticipantIds.filter(
      (userId) => userId !== author.id,
    );

    await this.persistNotification({
      targetUserIds,
      notificationKind: 'task.unassigned',
      metadata: {
        author,
        task,
      },
    });

    this.realTimeGateway.notifyUnassignedUsers(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_DELETED)
  async taskDeleted(@Payload() payload: TaskDeletedNotification) {
    const { targetUserIds, author, task } = payload;

    await this.persistNotification({
      targetUserIds,
      notificationKind: 'task.deleted',
      metadata: {
        author,
        task,
      },
    });

    this.realTimeGateway.notifyDeletedTask(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_COMMENT_CREATED)
  async taskCommentCreated(@Payload() payload: TaskCommentCreatedNotification) {
    const { author, task } = payload;

    const targetUserIds = task.participantIds.filter(
      (userId) => userId !== author.id,
    );

    await this.persistNotification({
      targetUserIds,
      notificationKind: 'task.comment.created',
      metadata: {
        author,
        task,
      },
    });

    this.realTimeGateway.notifyTaskCommentCreated(payload);
  }

  private async persistNotification({
    targetUserIds,
    notificationKind,
    metadata,
  }: {
    targetUserIds: string[];
    notificationKind: NotificationKind;
    metadata: Record<string, any>;
  }) {
    await Promise.all(
      targetUserIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: notificationKind,
          metadata,
        }),
      ),
    );
  }
}
