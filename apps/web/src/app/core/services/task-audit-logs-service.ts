import type { ITaskAuditLogsService } from '../contracts/itasks-audit-logs-service';
import type { IHttpClient } from '../contracts/ihttp-client';

import type { TaskAuditLog } from '@challenge/shared';

export class TaskAuditLogsService implements ITaskAuditLogsService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  list(): Promise<TaskAuditLog[]> {
    return this.httpClient.get('/task-audit-logs');
  }
}
