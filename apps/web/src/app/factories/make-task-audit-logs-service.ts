import { TaskAuditLogsService } from '../core/services/task-audit-logs-service';
import { makeHttpClient } from './make-http-client';

export function makeTaskAuditLogsService() {
  return new TaskAuditLogsService(makeHttpClient());
}
