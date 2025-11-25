import type { HttpRequestConfig } from './ihttp-client';

import type {
  ListCreationTaskAuditLog,
  ListDeletionTaskAuditLog,
  ListUpdateTaskAuditLog,
  TaskAuditLog,
} from '@challenge/shared';

export abstract class ITaskAuditLogsService {
  abstract list(config?: HttpRequestConfig): Promise<TaskAuditLog[]>;
  abstract listTaskCreationAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListCreationTaskAuditLog[]>;
  abstract listTaskUpdateAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListUpdateTaskAuditLog[]>;
  abstract listTaskDeletionAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListDeletionTaskAuditLog[]>;
}
