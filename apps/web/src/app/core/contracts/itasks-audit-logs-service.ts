import type { HttpRequestConfig } from './ihttp-client';

import type {
  AuditLogOfTaskCreation,
  AuditLogOfTaskDeletion,
  AuditLogOfTaskUpdate,
} from '@/app/entities/task-audit-log';
import type { TaskAuditLog } from '@challenge/shared';

export abstract class ITaskAuditLogsService {
  abstract list(config?: HttpRequestConfig): Promise<TaskAuditLog[]>;
  abstract listTaskCreationAuditLog(
    config?: HttpRequestConfig,
  ): Promise<AuditLogOfTaskCreation[]>;
  abstract listTaskUpdateAuditLog(
    config?: HttpRequestConfig,
  ): Promise<AuditLogOfTaskUpdate[]>;
  abstract listTaskDeletionAuditLog(
    config?: HttpRequestConfig,
  ): Promise<AuditLogOfTaskDeletion[]>;
  abstract delete(id: string, config?: HttpRequestConfig): Promise<void>;
}
