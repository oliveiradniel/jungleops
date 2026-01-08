import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserTaskEntity } from '../entities/users-tasks.entity';

import type { IUsersTasksRepository } from 'src/database/contracts/users-tasks.contract';

import { UserTaskMapper } from 'src/modules/users-tasks/mappers/user-task.mapper';

import type { CreateUserTaskData, UserTask } from '@challenge/shared';

export class UsersTasksRepository implements IUsersTasksRepository {
  constructor(
    @InjectRepository(UserTaskEntity)
    private readonly usersTasksRepository: Repository<UserTaskEntity>,
  ) {}

  async getUserIdsByTaskId(taskId: string): Promise<string[]> {
    const usersTasks = await this.usersTasksRepository.find({
      where: { taskId },
      select: ['userId'],
    });

    return usersTasks.map((usersTask) => usersTask.userId);
  }

  async getTaskIdsByUserId(userId: string): Promise<string[]> {
    const usersTasks = await this.usersTasksRepository.find({
      where: { userId },
    });

    return usersTasks.map((userTask) => userTask.taskId);
  }

  async getUsersTasksByTaskId(taskId: string): Promise<UserTask[]> {
    const usersTasks = await this.usersTasksRepository.find({
      where: { taskId },
    });

    return UserTaskMapper.toDomainList(usersTasks);
  }

  async create(data: CreateUserTaskData): Promise<UserTask> {
    const { taskId, userId } = data;

    const registeredUsersTasks = this.usersTasksRepository.create({
      taskId,
      userId,
    });

    const userTaskEntity =
      await this.usersTasksRepository.save(registeredUsersTasks);

    return UserTaskMapper.toDomain(userTaskEntity);
  }
}
