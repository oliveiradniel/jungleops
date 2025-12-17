import { TaskMapper } from './task-mapper';

import type {
  AuditLogOfTaskCreation,
  AuditLogOfTaskDeletion,
  AuditLogOfTaskUpdate,
} from '../entities/task-audit-log';
import type {
  ListCreationTaskAuditLogWithAuthor,
  ListDeletionTaskAuditLogWithAuthor,
  ListUpdateTaskAuditLogWithAuthor,
} from '@challenge/shared';

export class TaskAuditLogMapper {
  static toDomainCreation(
    taskAuditLogs: ListCreationTaskAuditLogWithAuthor[],
  ): AuditLogOfTaskCreation[] {
    return taskAuditLogs.map((taskAuditLog) => {
      const { id, author, task, createdAt } = taskAuditLog;

      return {
        id,
        task: TaskMapper.toDomain(JSON.parse(task)),
        author,
        createdAt,
      };
    });
  }

  static toDomainUpdate(
    taskAuditLogs: ListUpdateTaskAuditLogWithAuthor[],
  ): AuditLogOfTaskUpdate[] {
    return taskAuditLogs.map((taskAuditLog) => {
      const {
        id,
        taskId,
        author,
        taskTitle,
        fieldName,
        newValue,
        oldValue,
        changedAt,
      } = taskAuditLog;

      return {
        id,
        task: {
          id: taskId,
          title: taskTitle,
        },
        author,
        fieldName,
        newValue,
        oldValue,
        changedAt,
      };
    });
  }

  static toDomainDeletion(
    taskAuditLogs: ListDeletionTaskAuditLogWithAuthor[],
  ): AuditLogOfTaskDeletion[] {
    return taskAuditLogs.map((taskAuditLog) => {
      const { id, author, task, deletedAt } = taskAuditLog;

      return {
        id,
        task: TaskMapper.toDomain(JSON.parse(task)),
        author,
        deletedAt,
      };
    });
  }
}
