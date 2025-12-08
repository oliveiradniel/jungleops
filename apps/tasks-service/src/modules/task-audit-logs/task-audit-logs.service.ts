import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import type { ITaskAuditLogsRepository } from 'src/database/contracts/task-audit-logs.contract';

import { CreateTaskAuditLogData } from './types/create-task-audit-log-data.type';

import {
  NOTIFICATIONS_SERVICE_RMQ,
  TASK_AUDIT_LOGS_REPOSITORY,
} from 'src/shared/constants/tokens';

import {
  ListCreationTaskAuditLog,
  ListDeletionTaskAuditLog,
  ListUpdateTaskAuditLog,
  TaskAuditLog,
} from '@challenge/shared';

@Injectable()
export class TaskAuditLogsService {
  constructor(
    @Inject(TASK_AUDIT_LOGS_REPOSITORY)
    private readonly taskAuditLogsRepository: ITaskAuditLogsRepository,
    @Inject(NOTIFICATIONS_SERVICE_RMQ)
    private readonly notificationsClient: ClientProxy,
  ) {}

  list(): Promise<TaskAuditLog[]> {
    return this.taskAuditLogsRepository.list();
  }

  listTaskCreationAuditLog(): Promise<ListCreationTaskAuditLog[]> {
    return this.taskAuditLogsRepository.listTaskCreationAuditLog();
  }

  listTaskUpdateAuditLog(): Promise<ListUpdateTaskAuditLog[]> {
    return this.taskAuditLogsRepository.listTaskUpdateAuditLog();
  }

  listTaskDeletionAuditLog(): Promise<ListDeletionTaskAuditLog[]> {
    return this.taskAuditLogsRepository.listTaskDeletionAuditLog();
  }

  create(data: CreateTaskAuditLogData): Promise<TaskAuditLog> {
    const { action, taskId, userId, taskTitle, oldValue, newValue, fieldName } =
      data;

    this.notificationsClient.emit('task-audit-log.changed', {
      action,
    });

    return this.taskAuditLogsRepository.create({
      action,
      taskId,
      userId,
      taskTitle,
      oldValue,
      newValue,
      fieldName,
    });
  }

  async delete(id: string) {
    const { action } = await this.verifyTaskAuditLogExists(id);

    await this.taskAuditLogsRepository.delete(id);

    this.notificationsClient.emit('task-audit-log.changed', {
      action,
    });
  }

  private async verifyTaskAuditLogExists(id: string): Promise<TaskAuditLog> {
    const taskAuditLog = await this.taskAuditLogsRepository.getById(id);
    if (!taskAuditLog) {
      throw new NotFoundException('Task audit log not found.');
    }

    return taskAuditLog;
  }
}
