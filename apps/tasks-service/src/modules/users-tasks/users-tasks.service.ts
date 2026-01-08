import { Inject, Injectable } from '@nestjs/common';

import type { IUsersTasksRepository } from 'src/database/contracts/users-tasks.contract';
import type { CreateUserTaskData, UserTask } from '@challenge/shared';

import { USERS_TASKS_REPOSITORY } from 'src/shared/constants/tokens';

@Injectable()
export class UsersTasksService {
  constructor(
    @Inject(USERS_TASKS_REPOSITORY)
    private readonly usersTasksRepository: IUsersTasksRepository,
  ) {}

  listUserIdsByTaskId(taskId: string): Promise<string[]> {
    return this.usersTasksRepository.getUserIdsByTaskId(taskId);
  }

  listUsersTasksByTaskId(taskId: string): Promise<UserTask[]> {
    return this.usersTasksRepository.getUsersTasksByTaskId(taskId);
  }

  listTaskIdsByUserId(userId: string): Promise<string[]> {
    return this.usersTasksRepository.getTaskIdsByUserId(userId);
  }

  create(data: CreateUserTaskData): Promise<UserTask> {
    const { taskId, userId } = data;

    return this.usersTasksRepository.create({ taskId, userId });
  }
}
