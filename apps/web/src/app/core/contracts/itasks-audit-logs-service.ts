import type { HttpRequestConfig } from './ihttp-client';

import type { TaskAuditLog } from '@challenge/shared';

export abstract class ITaskAuditLogsService {
  abstract list(config?: HttpRequestConfig): Promise<TaskAuditLog[]>;
}
