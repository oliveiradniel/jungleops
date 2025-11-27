import type { ITaskAuditLogsService } from '../contracts/itasks-audit-logs-service';
import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import type {
  ListCreationTaskAuditLogWithAuthorData,
  ListDeletionTaskAuditLogWithAuthorData,
  ListUpdateTaskAuditLogWithAuthorData,
  TaskAuditLog,
} from '@challenge/shared';

export class TaskAuditLogsService implements ITaskAuditLogsService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  list(): Promise<TaskAuditLog[]> {
    return this.httpClient.get('/task-audit-logs');
  }

  listTaskCreationAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListCreationTaskAuditLogWithAuthorData[]> {
    return this.httpClient.get('/task-audit-logs/creation', config);
  }

  listTaskUpdateAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListUpdateTaskAuditLogWithAuthorData[]> {
    return this.httpClient.get('/task-audit-logs/update', config);
  }

  listTaskDeletionAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListDeletionTaskAuditLogWithAuthorData[]> {
    return this.httpClient.get('/task-audit-logs/deletion', config);
  }
}
