import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';

import { firstValueFrom } from 'rxjs';
import { getConfig } from 'src/shared/config/config.helper';

import type {
  CreateUserTaskData,
  Participant,
  UserTask,
} from '@challenge/shared';

@Injectable()
export class UsersTasksService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.baseURL = getConfig(this.configService).USERS_TASKS_SERVICE_BASE_URL;
  }

  async listUsersByTaskId(taskId: string): Promise<Participant[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<UserTask[]>(`${this.baseURL}/list-users/${taskId}`),
    );

    const userIds = data.map((user) => user.userId);
    const users = await this.usersService.findUsers(userIds);

    const participants: Participant[] = users.map((user) => {
      const userTask = data.find(
        (currentUserTask) => currentUserTask.userId === user.id,
      )!;

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        assignedAt: userTask.createdAt,
      };
    });

    return participants;
  }

  async create(dataToCreate: CreateUserTaskData): Promise<UserTask> {
    const { taskId, userId } = dataToCreate;

    const { data } = await firstValueFrom(
      this.httpService.post<UserTask>(this.baseURL, { taskId, userId }),
    );

    return data;
  }
}
