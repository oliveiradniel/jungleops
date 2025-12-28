import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { SignalsPublisherService } from 'src/messaging/signals-publisher.service';

import { type ITaskAuditLogsRepository } from 'src/database/contracts/task-audit-logs.contract';

import { type CreateTaskAuditLogData } from './types/create-task-audit-log-data.type';

import { TASK_AUDIT_LOGS_REPOSITORY } from 'src/shared/constants/tokens';

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
    private readonly signalsPublisherService: SignalsPublisherService,
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

  async create(data: CreateTaskAuditLogData): Promise<TaskAuditLog> {
    const { taskId, userId, taskTitle, action, oldValue, newValue, fieldName } =
      data;

    const taskAuditLog = await this.taskAuditLogsRepository.create({
      action,
      taskId,
      userId,
      taskTitle,
      oldValue,
      newValue,
      fieldName,
    });

    this.signalsPublisherService.taskAuditLog({
      action,
      authorId: userId,
    });

    return taskAuditLog;
  }

  async delete(id: string, deletedBy: string) {
    const { action } = await this.verifyTaskAuditLogExists(id);

    await this.taskAuditLogsRepository.delete(id);

    this.signalsPublisherService.taskAuditLog({
      action,
      authorId: deletedBy,
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
