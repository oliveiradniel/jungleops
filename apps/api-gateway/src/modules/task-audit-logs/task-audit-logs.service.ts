import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';
import { getConfig } from 'src/shared/config/config.helper';

import {
  ListCreationTaskAuditLog,
  ListDeletionTaskAuditLog,
  ListUpdateTaskAuditLog,
  TaskAuditLog,
} from '@challenge/shared';

@Injectable()
export class TaskAuditLogsService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.baseURL = getConfig(configService).TASK_AUDIT_LOGS_SERVICE_BASE_URL;
  }

  async list(): Promise<TaskAuditLog[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<TaskAuditLog[]>(this.baseURL),
    );

    return data;
  }

  async listTaskCreationAuditLog(): Promise<ListCreationTaskAuditLog[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<ListCreationTaskAuditLog[]>(
        `${this.baseURL}/creation`,
      ),
    );

    return data;
  }

  async listtaskUpdateAuditLog(): Promise<ListUpdateTaskAuditLog[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<ListUpdateTaskAuditLog[]>(`${this.baseURL}/update`),
    );

    return data;
  }

  async listTaskDeletionAuditLog(): Promise<ListDeletionTaskAuditLog[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<ListDeletionTaskAuditLog[]>(
        `${this.baseURL}/deletion`,
      ),
    );

    return data;
  }
}
