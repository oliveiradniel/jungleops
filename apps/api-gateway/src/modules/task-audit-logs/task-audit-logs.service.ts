import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';

import { firstValueFrom } from 'rxjs';
import { getConfig } from 'src/shared/config/config.helper';

import {
  ListCreationTaskAuditLog,
  ListCreationTaskAuditLogWithAuthorData,
  ListDeletionTaskAuditLog,
  ListDeletionTaskAuditLogWithAuthorData,
  ListUpdateTaskAuditLog,
  ListUpdateTaskAuditLogWithAuthorData,
  TaskAuditLog,
  UserWithoutPassword,
} from '@challenge/shared';

@Injectable()
export class TaskAuditLogsService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
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

  async listTaskCreationAuditLog(): Promise<
    ListCreationTaskAuditLogWithAuthorData[]
  > {
    const { data } = await firstValueFrom(
      this.httpService.get<ListCreationTaskAuditLog[]>(
        `${this.baseURL}/creation`,
      ),
    );

    const dataWithAuthorData =
      await this.addAuthorData<ListCreationTaskAuditLogWithAuthorData>(data);

    return dataWithAuthorData;
  }

  async listTaskUpdateAuditLog(): Promise<
    ListUpdateTaskAuditLogWithAuthorData[]
  > {
    const { data } = await firstValueFrom(
      this.httpService.get<ListUpdateTaskAuditLog[]>(`${this.baseURL}/update`),
    );

    const enriched = await Promise.all(
      data.map(async (log) => {
        if (log.fieldName !== 'userIds') {
          return log;
        }

        const oldIds = this.safeParseIds(log.oldValue as string);
        const newIds = this.safeParseIds(log.newValue as string);

        const [oldUsers, newUsers] = await Promise.all([
          this.usersService.findUsers(oldIds),
          this.usersService.findUsers(newIds),
        ]);

        return {
          ...log,
          oldValue: oldUsers.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
          })),
          newValue: newUsers.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
          })),
        };
      }),
    );

    const enrichedWithAuthorData =
      this.addAuthorData<ListUpdateTaskAuditLogWithAuthorData>(enriched);

    return enrichedWithAuthorData;
  }

  async listTaskDeletionAuditLog(): Promise<
    ListDeletionTaskAuditLogWithAuthorData[]
  > {
    const { data } = await firstValueFrom(
      this.httpService.get<ListDeletionTaskAuditLog[]>(
        `${this.baseURL}/deletion`,
      ),
    );

    const datadWithAuthorData =
      this.addAuthorData<ListDeletionTaskAuditLogWithAuthorData>(data);

    return datadWithAuthorData;
  }

  private safeParseIds(value: string | null | undefined): string[] {
    if (!value) return [];

    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private async addAuthorData<T>(
    data:
      | ListCreationTaskAuditLog[]
      | ListUpdateTaskAuditLog[]
      | ListDeletionTaskAuditLog[],
  ): Promise<T[]> {
    const authorIds = data.map((log) => log.authorId);
    const authorsData = await this.usersService.findUsers(authorIds);

    const dataWithAuthorData = data.map((log) => {
      const authorId = log.authorId;

      const authorData = authorsData.find(
        (author) => author.id === authorId,
      ) as UserWithoutPassword;

      return {
        ...log,
        authorData,
      };
    });

    return dataWithAuthorData;
  }
}
