import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { DataSource, ILike, In, ObjectLiteral, Repository } from 'typeorm';

import { TaskEntity } from '../entities/task.entity';
import { UserTaskEntity } from '../entities/users-tasks.entity';
import { TaskMapper } from 'src/modules/tasks/mappers/task.mapper';

import type {
  CreateTaskData,
  UpdateTaskData,
  Task,
  TaskWithCommentCount,
  TaskFilters,
  TasksList,
} from '@challenge/shared';

import type { ITasksRepository } from 'src/database/contracts/tasks-repository.contract';
import type { ICommentsRepository } from 'src/database/contracts/comments-repository.contract';

import { COMMENTS_REPOSITORY } from 'src/shared/constants/tokens';

export class TasksRepository implements ITasksRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @Inject(COMMENTS_REPOSITORY)
    private readonly commentsRepository: ICommentsRepository,
    private readonly dataSource: DataSource,
  ) {}

  async getById(id: string): Promise<Task | null> {
    const taskEntity = await this.tasksRepository.findOne({
      where: { id },
      relations: ['comments', 'comments.task'],
    });

    return taskEntity ? TaskMapper.toDomain(taskEntity) : null;
  }

  async getByIdWithCommentsCount(
    id: string,
  ): Promise<TaskWithCommentCount | null> {
    const taskEntity = await this.tasksRepository.findOne({
      where: { id },
    });

    if (!taskEntity) return null;

    const taskWithCommentCount: TaskWithCommentCount = {
      ...TaskMapper.toDomainWithoutComments(taskEntity),
      commentsCount: await this.commentsRepository.countByTaskId(taskEntity.id),
    };

    return taskWithCommentCount;
  }

  async getByTitle(title: string): Promise<Task | null> {
    const taskEntity = await this.tasksRepository.findOne({
      where: { title: ILike(title) },
    });

    return taskEntity ? TaskMapper.toDomain(taskEntity) : null;
  }

  async list(filters: TaskFilters): Promise<TasksList> {
    const { page, size, orderBy, order, status, priority, search } = filters;

    const parsedStatus =
      typeof status === 'string'
        ? status.split(',').map((value) => value.toUpperCase())
        : undefined;

    const parsedPriority =
      typeof priority === 'string'
        ? priority.split(',').map((value) => value.toUpperCase())
        : undefined;

    const skip = (page - 1) * size;

    const baseFilters: any = {};
    const where: any[] = [];

    if (parsedStatus?.length) {
      baseFilters.status = In(parsedStatus);
    }

    if (parsedPriority?.length) {
      baseFilters.priority = In(parsedPriority);
    }

    if (typeof search === 'string' && search.trim()) {
      where.push(
        { ...baseFilters, title: ILike(`%${search}%`) },
        { ...baseFilters, description: ILike(`%${search}%`) },
      );
    } else {
      where.push(baseFilters);
    }

    const dateLabels = {
      'created-at': 'createdAt',
      term: 'term',
    };

    const totalAll = await this.tasksRepository.count();

    const [tasks, totalFiltered] = await this.tasksRepository.findAndCount({
      take: size,
      skip,
      where,
      order: {
        [dateLabels[orderBy ?? 'term']]: order ?? 'asc',
      },
    });

    const tasksWithCommentCount: TaskWithCommentCount[] = await Promise.all(
      tasks.map(async (task) => {
        return {
          ...TaskMapper.toDomainWithoutComments(task),
          commentsCount: await this.commentsRepository.countByTaskId(task.id),
        };
      }),
    );

    const statusWhere = { ...baseFilters } as ObjectLiteral;
    delete statusWhere.status;

    const priorityWhere = { ...baseFilters } as ObjectLiteral;
    delete priorityWhere.priority;

    const statusFacetsRaw = await this.tasksRepository
      .createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where(statusWhere)
      .groupBy('task.status')
      .getRawMany();

    const priorityFacetsRaw = await this.tasksRepository
      .createQueryBuilder('task')
      .select('task.priority', 'priority')
      .addSelect('COUNT(*)', 'count')
      .where(priorityWhere)
      .groupBy('task.priority')
      .getRawMany();

    const statusFacets = statusFacetsRaw.map((facet) => ({
      value: facet.status,
      count: Number(facet.count),
    }));

    const priorityFacets = priorityFacetsRaw.map((facet) => ({
      value: facet.priority,
      count: Number(facet.count),
    }));

    const totalPages = Math.ceil(totalFiltered / size);

    return {
      tasks: tasksWithCommentCount,
      totalAll,
      totalFiltered,
      pagination: {
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
      facets: {
        status: statusFacets,
        priority: priorityFacets,
      },
    };
  }

  async create(data: CreateTaskData): Promise<Task> {
    const { authorId, title, description, term, priority, status } = data;

    const registeredTask = this.tasksRepository.create({
      authorId,
      title,
      description,
      term,
      priority,
      status,
    });

    const taskEntity = await this.tasksRepository.save(registeredTask);

    return TaskMapper.toDomain(taskEntity);
  }

  async update(id: string, data: UpdateTaskData): Promise<void> {
    const {
      lastEditedBy,
      userIds,
      title,
      description,
      term,
      priority,
      status,
    } = data;

    await this.dataSource.transaction(async (manager) => {
      if (userIds) {
        const currentRelations = await manager.find(UserTaskEntity, {
          where: { taskId: id },
          select: ['userId'],
        });

        const currentUserIds = currentRelations.map(
          (relations) => relations.userId,
        );

        const toAdd = userIds.filter(
          (userId) => !currentUserIds.includes(userId),
        );
        const toRemove = currentUserIds.filter(
          (userId) => !userIds.includes(userId),
        );

        if (toAdd.length > 0) {
          const usersTask = toAdd.map((userId) =>
            manager.create(UserTaskEntity, {
              taskId: id,
              userId,
            }),
          );

          await manager.save(UserTaskEntity, usersTask);
        }

        if (toRemove.length > 0) {
          await manager.delete(UserTaskEntity, {
            taskId: id,
            userId: In(toRemove),
          });
        }
      }

      await manager.update(TaskEntity, id, {
        lastEditedBy,
        title,
        description,
        term,
        priority,
        status,
      });
    });
  }

  async delete(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
