import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { UsersTasksService } from '../users-tasks/users-tasks.service';
import { TaskAuditLogsService } from '../task-audit-logs/task-audit-logs.service';

import { CreateTaskAuditLogData } from '../task-audit-logs/types/create-task-audit-log-data.type';

import type { ITasksRepository } from 'src/database/contracts/tasks-repository.contract';

import {
  type CreateTaskData,
  type Task,
  type UpdateTaskData,
  type UpdatedTaskNotificationPayload,
  type AssignedToTaskNotificationPayload,
  type ChangedField,
  type TaskAuditLog,
  type TaskWithCommentCount,
  type TasksList,
  type TaskFilters,
  AuditAction,
  FieldName,
} from '@challenge/shared';

import {
  NOTIFICATIONS_SERVICE_RMQ,
  TASKS_REPOSITORY,
} from 'src/shared/constants/tokens';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASKS_REPOSITORY)
    private readonly tasksRepository: ITasksRepository,
    private readonly taskAuditLogsService: TaskAuditLogsService,
    private readonly usersTasksService: UsersTasksService,
    @Inject(NOTIFICATIONS_SERVICE_RMQ)
    private readonly notificationsClient: ClientProxy,
  ) {}

  async findById(id: string): Promise<Task> {
    return this.verifyTaskExists(id);
  }

  async list(pagination: TaskFilters): Promise<TasksList> {
    const { page, size, orderBy, order, status, priority } = pagination;

    return this.tasksRepository.list({
      page,
      size,
      orderBy,
      order,
      status,
      priority,
    });
  }

  async listTasksByUserId(userId: string): Promise<TaskWithCommentCount[]> {
    const taskIds = await this.usersTasksService.listTaskIdsByUserId(userId);

    const tasks = await Promise.all(
      taskIds.map((taskId) =>
        this.tasksRepository.getByIdWithCommentsCount(taskId),
      ),
    );

    return tasks.flatMap((task) => (task ? [task] : []));
  }

  async create(data: CreateTaskData): Promise<Task> {
    const { authorId, title, description, term, priority, status } = data;

    const titleTaken = await this.tasksRepository.getByTitle(title);
    if (titleTaken) {
      throw new ConflictException('Title is already in use.');
    }

    const task = await this.tasksRepository.create({
      authorId,
      title,
      description,
      term,
      priority,
      status,
    });

    await this.logTaskChange({
      action: AuditAction.CREATE,
      taskId: task.id,
      userId: task.authorId,
      taskTitle: task.title,
      oldValue: null,
      newValue: JSON.stringify(task),
      fieldName: null,
    });

    this.notificationsClient.emit('task.created', task);

    return task;
  }

  async update(id: string, data: UpdateTaskData): Promise<void> {
    const {
      lastEditedBy,
      userIds = [],
      title,
      description,
      term,
      priority,
      status,
    } = data;

    const task = await this.verifyTaskExists(id);
    if (title) {
      const titleTaken = await this.tasksRepository.getByTitle(title);
      if (titleTaken && titleTaken.id !== id) {
        throw new ConflictException('Title is already in use.');
      }
    }

    const parsedTask = {
      lastEditedBy: lastEditedBy,
      title: title ?? task.title,
      description: description ?? task.description,
      term: term ?? task.term,
      priority: priority ?? task.priority,
      status: status ?? task.status,
    };

    const existingUserIds = await this.usersTasksService.listUserIdsByTaskId(
      task.id,
    );

    const hasAnyUsersForDeletion = existingUserIds.some(
      (id) => !userIds.includes(id),
    );

    const newUserIds = userIds.filter((id) => !existingUserIds.includes(id));

    const newUserIdsCount = newUserIds.length;

    await this.tasksRepository.update(id, { ...parsedTask, userIds });

    const oldDate = task.term;
    const newDate = parsedTask.term;

    const changedFields: ChangedField[] = [
      {
        fieldName: FieldName.TITLE,
        dirty: title !== task.title,
        newValue: title,
        oldValue: task.title,
      },
      {
        fieldName: FieldName.DESCRIPTION,
        dirty: description !== task.description,
        newValue: description,
        oldValue: task.description,
      },
      {
        fieldName: FieldName.TERM,
        dirty: newDate !== oldDate,
        newValue: newDate,
        oldValue: oldDate,
      },
      {
        fieldName: FieldName.PRIORITY,
        dirty: priority !== task.priority,
        newValue: priority,
        oldValue: task.priority,
      },
      {
        fieldName: FieldName.STATUS,
        dirty: status !== task.status,
        newValue: status,
        oldValue: task.status,
      },
      {
        fieldName: FieldName.USER_IDS,
        dirty: newUserIdsCount > 0 || hasAnyUsersForDeletion,
        newValue: JSON.stringify([...newUserIds, ...existingUserIds]),
        oldValue: JSON.stringify(existingUserIds),
      },
    ].filter((field) => field.dirty);

    await Promise.all(
      changedFields.map((field) =>
        this.logTaskChange({
          action: AuditAction.UPDATE,
          taskId: task.id,
          userId: lastEditedBy,
          taskTitle: task.title,
          fieldName: field.fieldName,
          oldValue: field.oldValue,
          newValue: field.newValue,
        }),
      ),
    );

    const fullTask = {
      id: task.id,
      authorId: task.authorId,
      lastEditedBy: task.lastEditedBy,
      title: parsedTask.title,
      description: parsedTask.description,
      term: parsedTask.term,
      priority: parsedTask.priority,
      status: parsedTask.status,
      userIds: [...existingUserIds, ...newUserIds],
    };

    const upadteTaskPayload: UpdatedTaskNotificationPayload = {
      taskId: task.id,
      changedFields,
      participantIds: userIds ?? [],
      newUserIds: newUserIds.length,
      updatedBy: task.lastEditedBy,
      updatedAt: new Date(),
      fullTask,
    };

    const assignedIdsTaskPayload: AssignedToTaskNotificationPayload = {
      newUserIds,
      fullTask,
    };

    if (
      newUserIdsCount > 0 ||
      status !== task.status ||
      priority !== task.priority
    ) {
      if (newUserIdsCount > 0) {
        this.notificationsClient.emit('task.assigned', assignedIdsTaskPayload);
      }

      if (status !== task.status) {
        this.notificationsClient.emit('task.status', {
          participantIds: upadteTaskPayload.participantIds,
          lastEditedBy: lastEditedBy,
          title,
          status,
        });
      }

      if (priority !== task.priority) {
        this.notificationsClient.emit('task.priority', {
          participantIds: upadteTaskPayload.participantIds,
          lastEditedBy: lastEditedBy,
          title,
          priority,
        });
      }

      return;
    }

    this.notificationsClient.emit('task.updated', upadteTaskPayload);
  }

  async delete(id: string, deletedBy: string): Promise<void> {
    const task = await this.verifyTaskExists(id);

    await this.tasksRepository.delete(id);

    await this.logTaskChange({
      action: AuditAction.DELETE,
      taskId: task.id,
      userId: deletedBy,
      taskTitle: task.title,
      oldValue: JSON.stringify(task),
      newValue: null,
      fieldName: null,
    });

    this.notificationsClient.emit('task.deleted', {
      title: task.title,
      deletedBy,
    });
  }

  async verifyTaskExists(id: string) {
    const task = await this.tasksRepository.getById(id);
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }

  private async logTaskChange(
    data: CreateTaskAuditLogData,
  ): Promise<TaskAuditLog> {
    return this.taskAuditLogsService.create(data);
  }
}
