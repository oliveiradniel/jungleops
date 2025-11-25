import type { ITaskAuditLogsService } from '../contracts/itasks-audit-logs-service';
import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import type {
  ListCreationTaskAuditLog,
  ListDeletionTaskAuditLog,
  ListUpdateTaskAuditLog,
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
  ): Promise<ListCreationTaskAuditLog[]> {
    return this.httpClient.get('/task-audit-logs/creation', config);
  }

  listTaskUpdateAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListUpdateTaskAuditLog[]> {
    return this.httpClient.get('/task-audit-logs/update', config);
  }

  listTaskDeletionAuditLog(
    config?: HttpRequestConfig,
  ): Promise<ListDeletionTaskAuditLog[]> {
    return this.httpClient.get('/task-audit-logs/deletion', config);
  }
}
