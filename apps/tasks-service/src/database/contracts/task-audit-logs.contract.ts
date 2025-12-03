import { CreateTaskAuditLogData } from 'src/modules/task-audit-logs/types/create-task-audit-log-data.type';

import {
  ListCreationTaskAuditLog,
  ListDeletionTaskAuditLog,
  ListUpdateTaskAuditLog,
  TaskAuditLog,
} from '@challenge/shared';

export abstract class ITaskAuditLogsRepository {
  abstract getById(id: string): Promise<TaskAuditLog | null>;
  abstract list(): Promise<TaskAuditLog[]>;
  abstract listTaskCreationAuditLog(): Promise<ListCreationTaskAuditLog[]>;
  abstract listTaskUpdateAuditLog(): Promise<ListUpdateTaskAuditLog[]>;
  abstract listTaskDeletionAuditLog(): Promise<ListDeletionTaskAuditLog[]>;
  abstract create(data: CreateTaskAuditLogData): Promise<TaskAuditLog>;
  abstract delete(id: string): Promise<void>;
}
