import type { HttpRequestConfig } from './ihttp-client';

import type {
  ListCreationTaskAuditLogWithAuthorData,
  ListDeletionTaskAuditLogWithAuthorData,
  ListUpdateTaskAuditLogWithAuthorData,
  TaskAuditLog,
} from '@challenge/shared';

export abstract class ITaskAuditLogsService {
  abstract list(config?: HttpRequestConfig): Promise<TaskAuditLog[]>;
  abstract listTaskCreationAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListCreationTaskAuditLogWithAuthorData[]>;
  abstract listTaskUpdateAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListUpdateTaskAuditLogWithAuthorData[]>;
  abstract listTaskDeletionAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListDeletionTaskAuditLogWithAuthorData[]>;
}
