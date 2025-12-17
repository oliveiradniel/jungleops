import { TaskAuditLogMapper } from '@/app/mappers/task-audit-log-mapper';

import type { ITaskAuditLogsService } from '../contracts/itasks-audit-logs-service';
import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import type {
  AuditLogOfTaskCreation,
  AuditLogOfTaskDeletion,
  AuditLogOfTaskUpdate,
} from '@/app/entities/task-audit-log';
import type {
  ListCreationTaskAuditLogWithAuthor,
  ListUpdateTaskAuditLogWithAuthor,
  ListDeletionTaskAuditLogWithAuthor,
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

  async listTaskCreationAuditLog(
    config?: HttpRequestConfig,
  ): Promise<AuditLogOfTaskCreation[]> {
    const taskAuditLogs = await this.httpClient.get<
      ListCreationTaskAuditLogWithAuthor[]
    >('/task-audit-logs/creation', config);

    return TaskAuditLogMapper.toDomainCreation(taskAuditLogs);
  }

  async listTaskUpdateAuditLog(
    config?: HttpRequestConfig,
  ): Promise<AuditLogOfTaskUpdate[]> {
    const taskAuditLogs = await this.httpClient.get<
      ListUpdateTaskAuditLogWithAuthor[]
    >('/task-audit-logs/update', config);

    return TaskAuditLogMapper.toDomainUpdate(taskAuditLogs);
  }

  async listTaskDeletionAuditLog(
    config?: HttpRequestConfig,
  ): Promise<AuditLogOfTaskDeletion[]> {
    const taskAuditLogs = await this.httpClient.get<
      ListDeletionTaskAuditLogWithAuthor[]
    >('/task-audit-logs/deletion', config);

    return TaskAuditLogMapper.toDomainDeletion(taskAuditLogs);
  }

  delete(id: string, config?: HttpRequestConfig): Promise<void> {
    return this.httpClient.delete(`/task-audit-logs/${id}`, config);
  }
}
