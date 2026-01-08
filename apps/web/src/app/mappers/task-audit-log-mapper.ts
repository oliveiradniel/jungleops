import { TaskMapper } from './task-mapper';

import { formatDateToBRWithHour } from '../utils/format-date-br';
import { fieldLabels } from '@/config/labels';

import type {
  AuditLogOfTaskCreation,
  AuditLogOfTaskDeletion,
  AuditLogOfTaskUpdate,
} from '../entities/task-audit-log';
import type {
  FieldName,
  ListCreationTaskAuditLogWithAuthor,
  ListDeletionTaskAuditLogWithAuthor,
  ListUpdateTaskAuditLogWithAuthor,
} from '@challenge/shared';

export class TaskAuditLogMapper {
  static toDomainCreation(
    taskAuditLogs: ListCreationTaskAuditLogWithAuthor[],
  ): AuditLogOfTaskCreation[] {
    return taskAuditLogs.map(({ id, author, task, createdAt }) => {
      return {
        id,
        task: TaskMapper.toDomain(task),
        author,
        createdAt: formatDateToBRWithHour(createdAt),
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
        fieldName: {
          value: fieldName,
          label: fieldLabels[fieldName as FieldName],
        },
        newValue,
        oldValue,
        changedAt: formatDateToBRWithHour(changedAt),
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
        task: TaskMapper.toDomain(task),
        author,
        deletedAt: formatDateToBRWithHour(deletedAt),
      };
    });
  }
}
