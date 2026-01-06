import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';

import { firstValueFrom } from 'rxjs';
import { getConfig } from 'src/shared/config/config.helper';

import {
  ListCreationTaskAuditLog,
  ListCreationTaskAuditLogWithAuthor,
  ListDeletionTaskAuditLog,
  ListDeletionTaskAuditLogWithAuthor,
  ListUpdateTaskAuditLog,
  ListUpdateTaskAuditLogWithAuthor,
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

  async listTaskCreationAuditLog(): Promise<
    ListCreationTaskAuditLogWithAuthor[]
  > {
    const { data } = await firstValueFrom(
      this.httpService.get<ListCreationTaskAuditLog[]>(
        `${this.baseURL}/creation`,
      ),
    );

    const dataWithAuthorData =
      await this.addAuthorData<ListCreationTaskAuditLogWithAuthor>(data);

    return dataWithAuthorData;
  }

  async listTaskUpdateAuditLog(): Promise<ListUpdateTaskAuditLogWithAuthor[]> {
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
      this.addAuthorData<ListUpdateTaskAuditLogWithAuthor>(enriched);

    return enrichedWithAuthorData;
  }

  async listTaskDeletionAuditLog(): Promise<
    ListDeletionTaskAuditLogWithAuthor[]
  > {
    const { data } = await firstValueFrom(
      this.httpService.get<ListDeletionTaskAuditLog[]>(
        `${this.baseURL}/deletion`,
      ),
    );

    const datadWithAuthor =
      this.addAuthorData<ListDeletionTaskAuditLogWithAuthor>(data);

    return datadWithAuthor;
  }

  async delete(id: string, userId: string): Promise<void> {
    await firstValueFrom(
      this.httpService.delete<void>(`${this.baseURL}/${id}`, {
        headers: {
          'deleted-by': userId,
        },
      }),
    );
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
    const authors = await this.usersService.findUsers(authorIds);

    const dataWithAuthor = data.map((log) => {
      const authorId = log.authorId;

      const author = authors.find(
        (author) => author.id === authorId,
      ) as UserWithoutPassword;

      return {
        ...log,
        author,
      };
    });

    return dataWithAuthor;
  }
}
