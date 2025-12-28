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

    await Promise.all(
      targetUserIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: 'task.created',
          metadata: {
            author,
            task,
          },
        }),
      ),
    );

    this.realTimeGateway.notifyCreatedTask(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_TITLE_UPDATED)
  async taskTitleUpdated(@Payload() payload: TaskTitleUpdatedNotification) {
    const { task, author } = payload;

    await Promise.all(
      task.participantIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: 'task.title.updated',
          metadata: {
            author,
            task,
          },
        }),
      ),
    );

    this.realTimeGateway.notifyUpdatedTaskTitle(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_STATUS_UPDATED)
  async taskStatusUpdated(
    @Payload()
    payload: TaskStatusUpdatedNotification,
  ) {
    const { author, task } = payload;

    await Promise.all(
      task.participantIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: 'task.status.updated',
          metadata: {
            author,
            task,
          },
        }),
      ),
    );

    this.realTimeGateway.notifyUpdatedTaskStatus(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_PRIORITY_UPDATED)
  async taskPriorityUpdated(
    @Payload()
    payload: TaskPriorityUpdatedNotification,
  ) {
    const { author, task } = payload;

    await Promise.all(
      task.participantIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: 'task.priority.updated',
          metadata: {
            author,
            task,
          },
        }),
      ),
    );

    this.realTimeGateway.notifyUpdatedTaskPriority(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_TERM_UPDATED)
  async taskTermUpdated(@Payload() payload: TaskTermUpdatedNotification) {
    const { author, task } = payload;

    await Promise.all(
      task.participantIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: 'task.term.updated',
          metadata: {
            author,
            task,
          },
        }),
      ),
    );
  }

  @EventPattern(EVENT_KEYS.TASK_ASSIGNED)
  async taskAssigned(@Payload() payload: TaskAssignedNotification) {
    const { author, task } = payload;

    await Promise.all(
      task.participantIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: 'task.assigned',
          metadata: {
            author,
            task,
          },
        }),
      ),
    );

    this.realTimeGateway.notifyAssignedUsers(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_UNASSIGNED)
  async taskUnassigned(@Payload() payload: TaskUnassignedNotification) {
    const { author, task } = payload;

    await Promise.all(
      task.removedParticipantIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: 'task.unassigned',
          metadata: {
            author,
            task,
          },
        }),
      ),
    );

    this.realTimeGateway.notifyUnassignedUsers(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_DELETED)
  async taskDeleted(@Payload() payload: TaskDeletedNotification) {
    const { targetUserIds, task } = payload;

    await Promise.all(
      targetUserIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: 'task.deleted',
          metadata: {
            task,
          },
        }),
      ),
    );

    this.realTimeGateway.notifyDeletedTask(payload);
  }

  @EventPattern(EVENT_KEYS.TASK_COMMENT_CREATED)
  async taskCommentCreated(@Payload() payload: TaskCommentCreatedNotification) {
    const { task } = payload;

    await Promise.all(
      task.participantIds.map((userId) =>
        this.notificationsService.create({
          userId,
          kind: 'task.comment.created',
          metadata: {
            task,
          },
        }),
      ),
    );

    this.realTimeGateway.notifyTaskCommentCreated(payload);
  }
}
